import React from 'react';
import './App.css';
import { getAllMovies, attemptLogIn, fetchUserRatings } from './../apiCalls';
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

  async componentDidMount() { 
    getAllMovies()
    .then(  
        (data) => {
          this.setState({
            isLoaded: true, 
            allMovies: data.movies 
          }); 
        },
        (error) => {
          console.error(error)
          this.setState({
            isLoaded: true,
            error: error,
          })
        }
      )
  }

  handleSubmit = async (info) => {
    await attemptLogIn(info)
      .then(
        (data) => {
          this.getUserRatings(data.user)
        },
        (error) => {
            alert('Email or password is incorrect, please try again.')
        });  
  }

  getUserRatings = async (info) => {
    if (info) {
      this.setState({ 
        userInfo: info,
        loggedIn: true 
      })
    
    fetchUserRatings(info)
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
    return (foundMovie ? <MovieDisplay movie={foundMovie}/> : null)
  }

  render() {
      if (!this.state.isLoaded) {
        return <p>Loading...</p>
      } else if (this.state.error) {
        return <h2>{this.state.error.message}</h2>
      } else {
        return (
          <div>
            <main>
            <Header userInfo={this.state.userInfo} />
            <Switch>
            <Route exact path="/">
            <Home 
              allMovies={ this.state.allMovies } 
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
        )
      }
  }
}

export default App;
