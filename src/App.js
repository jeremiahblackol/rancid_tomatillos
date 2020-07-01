import React from 'react';
import './App.css';
import LoginForm from './LoginForm'
import Home from './Home'
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

  render() {

    return (
      <div>
      <h1>Rancid Tomatillos</h1>
      <Router>
       <main>
         <nav>
           <ul>
             <li><a href="/">Home</a></li>
             <li><a href="/login">Login</a></li>
           </ul>
         </nav>
       <Switch>
           <Route exact path="/">
       <Home error={ this.state.error } 
             isLoaded={ this.state.isLoaded }
             allMovies={ this.state.allMovies } />
           </Route>
           <Route path="/login">
            <LoginForm />
          </Route>
       </Switch>
   
       </main>
   </Router>
   </div>
     );
   }
}

export default App;
