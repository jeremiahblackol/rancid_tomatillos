import React from 'react';
import './App.css';
import { getAllMovies, attemptLogIn, fetchUserRatings } from './../apiCalls';
import Header from '../Header/Header';
import LoginForm from '../LoginForm/LoginForm';
import Home from '../Home/Home';
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
    }
  }

  componentDidMount() { 
    console.log('app did mount')
    this.getMovies()
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
      .then(data => this.setState({ ratings: data.ratings }))
    }
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

  // getUserRatings = (id) => {
  //   fetchUserRatings(id)
  //     .then(response => this.setState({ ratings: response.ratings }))
  // }




  deleteRating = async (ratingID, movieID) => {
    // this.setState({ isLoaded: false })
    // let deleted = await removeRating(this.state.userInfo, ratingID)
    // let userRatings = await fetchUserRatings(this.state.userInfo.id)
    // this.setState({ ...this.state, ratings: userRatings.ratings })
    // console.log('userRatings', userRatings);
    // console.log('after delete fetch', this.state.ratings)
    // this.showMoviePage(movieID, userRatings)
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
                allMovies={this.state.allMovies} 
                />
              </Route>
              <Route path="/login">
              <LoginForm 
                handleSubmit={this.handleSubmit}
                loggedIn={this.state.loggedIn}
              />
            </Route>
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
