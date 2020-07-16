import React from 'react';
import './App.css';
import { getAllMovies, attemptLogIn, fetchUserRatings, fetchFavorites } from './../apiCalls';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import Home from '../Home/Home';
import Favorites from '../Favorites/Favorites';
import {
  BrowserRouter as Switch,
  Route,
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
      currentMovie: {},
      ratings: [],
      faves: [],
      location: window.location.pathname,
    }
  }

  componentDidMount() { 
    this.getMovies()
    this.getFaves()
  }

  getMovies = () => {
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

  getUserRatings = (info) => {
    if (info) {
      this.setState({ 
        userInfo: info,
        loggedIn: true 
      })
    
    fetchUserRatings(info.id)
      .then(data => this.setState({ 
        ratings: data.ratings
      }))
    }
  }

  getFaves = () => {
    fetchFavorites()
        .then(data => this.setState({ faves: data }))
        .catch(err => console.error(err))
  }

  showMoviePage = (routerProps) => {
    let movieID = parseInt(routerProps)
    let foundMovie = this.state.allMovies.find(movie => parseInt(movie.id) === movieID)
    let foundRating;
    if (this.state.ratings) {
       foundRating = this.state.ratings.find((rating) => foundMovie.id === rating.movie_id)
    } else {
      foundRating = null
    }
    return (foundMovie ? 
      <MovieDisplay 
        userID={this.state.userInfo.id} 
        postUserRating={this.postUserRating} 
        movieRating={foundRating}
        allRatings={this.state.ratings} 
        loggedIn={this.state.loggedIn} 
        movie={foundMovie}
        deleteRating={this.deleteRating}
        getUserRatings={this.getUserRatings}/>
        : 
        null)
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
              <Route exact path="/" render={ () => <Home 
                allMovies={this.state.allMovies} 
                faves={this.state.faves}
                loggedIn={this.state.loggedIn}
                getFaves={this.getFaves}
                />}/>
              <Route path="/login" render={ () => <LoginForm 
                handleSubmit={this.handleSubmit}
                loggedIn={this.state.loggedIn}
              />
              }/>
            <Route path='/favorites' render={() => <Favorites
                loggedIn={this.state.loggedIn}
                getFaves={this.getFaves}
                faves={this.state.faves}
              />}/>
            <Route 
              path={'/movies/:id'} 
              render={ routerProps => {
                const movieID = routerProps.match.params.id;
                return <MovieDisplay 
                  allMovies={this.state.allMovies}
                  movieID={Number(movieID)}
                  userInfo={this.state.userInfo}
                  ratings={this.state.ratings}
                  getUserRatings={this.getUserRatings}
                  loggedIn={this.state.loggedIn}  
                />
              }}
            />
          </Switch>
      </main>
   </div>
        )
      }
  }
}

export default App;
