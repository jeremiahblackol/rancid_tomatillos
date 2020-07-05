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

import MovieDisplay from '../MovieDisplay/MovieDisplay';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      allMovies: [],
      userInfo: {},
      loggedIn: false,
      currentMovie: {}
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

  showMoviePage = (routerProps) => {
    let movieID = parseInt(routerProps.match.params.id)
    let foundMovie = this.state.allMovies.find(movie => movie.id === movieID)
    // this.setState({ currentMovie: foundMovie})

    
    // figure out how to render movie display, it recognizes it but it will not render it.
    console.log(routerProps)

    return (foundMovie ? <MovieDisplay movie={foundMovie}/> : null)
  }

  render() {
    // if (this.state.currentMovie) {
    //   return <MovieDisplay />
    // } else {

    return (
      <div>
    
      <main>
      <Header userInfo={this.state.userInfo} />
      <Switch>
      <Route exact path="/">
       <Home error={ this.state.error } 
        isLoaded={ this.state.isLoaded }
        allMovies={ this.state.allMovies } 
        // showMoviePage={ this.showMoviePage }
        />
      </Route>
      <Route path="/login">
       <LoginForm 
         handleSubmit={this.handleSubmit}
         loggedIn={this.state.loggedIn}
       />
     </Route>
     <Route path={'/movies/:id'}render={ routerProps => this.showMoviePage(routerProps)} />
    </Switch>
      </main>
  
   </div>
     );
    }
   }
// }

export default App;
