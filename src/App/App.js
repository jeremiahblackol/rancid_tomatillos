import React from 'react';
import './App.css';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import Home from '../Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      allMovies: [],
      userInfo: {},
      loggedIn: false,
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
      .then(
        (data) => {
          this.getUserRatings(data.user)
        },
        (error) => {
            alert('Email or password is incorrect, please try again.')
        });
      
  }

  getUserRatings = (info) => {
    if (info) {
      this.setState({ 
        userInfo: info,
        loggedIn: true 
      })
    
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${info.id}/ratings`)
      .then(response => response.json())
      .then(data =>   this.setState(prevState => {
        prevState.userInfo.ratings = data.ratings 
    }))
    }
  }

  render() {

    return (
      <div>
      <Router>
      <main>
      <Header userInfo={this.state.userInfo} />
      <Switch>
      <Route exact path="/">
       <Home error={ this.state.error } 
        isLoaded={ this.state.isLoaded }
        allMovies={ this.state.allMovies } />
      </Route>
      <Route path="/login">
       <LoginForm 
         handleSubmit={this.handleSubmit}
         loggedIn={this.state.loggedIn}
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
