import React from 'react';
import './App.css';
import LoginForm from '../LoginForm/LoginForm'
import Home from '../Home/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      allMovies: [],
      userInfo: {},
    }
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => response.json())
      .then(
        (data) => {
          this.setState({
        isLoaded: true, 
        allMovies: data.movies 
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }

  handleSubmit = (info) => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password
      }),
    })
      .then(response => response.json())
      .then(data => this.getUserRatings(data.user))
    ;
  }

  getUserRatings = (info) => {
    this.setState({ userInfo: info })
    console.log(this.state.userInfo);
    
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${info.id}/ratings`)
      .then(response => response.json())
      .then(data =>   this.setState(prevState => {
        prevState.userInfo.ratings = data.ratings 
    }))
  }

  updateURL = (url) => {
    this.setState({currentURL: url})
  }

  render() {

    return (
      <div>
      <h1>Rancid Tomatillos</h1>
      <Router>
       <main>
         <nav>
           <ul>
             <li><a href="/home">Home</a></li>
             <li><a href="/login">Login</a></li>
           </ul>
         </nav>

       <Switch>
           <Route exact path="/home">
            <Home error={ this.state.error } 
             isLoaded={ this.state.isLoaded }
             allMovies={ this.state.allMovies } />
           </Route>
           <Route path="/login">
            <LoginForm 
              handleSubmit={this.handleSubmit}
            />
          </Route>
       </Switch>
   
       </main>
   </Router>
   </div>
     );
   }
}

export default App;
