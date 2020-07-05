import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


class MovieDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            movie: null,
            video: null,
            isLoaded: false,
            error: null
        }
    }

    //need to be able to fetch a single movie
    //fetch a single movie's videos
    //creating movie display component
    //error handling for bad requests

    componentDidMount() {
        Promise.all([
            fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.movie.id}`)
            .then(response => response.json()),
            fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.movie.id}/videos`)
            .then(response => response.json())

        ])
        .then(
            (data) => {this.movieAndVideoState(data)
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              })
            }
          )
    }

     movieAndVideoState = (info) => {
         if (info) {
             this.setState({
                 movie: info[0].movie,
                 video: info[1].videos,
                   isLoaded: true,
             })
         }
     }

    render() {
        if (this.state.error) {
            return <h1>ERROR: {this.state.error.message}</h1>
         } else if (!this.state.isLoaded) {
            return <div>loading...</div>
         } else {

        return (
            <div>
                <header>
                <h2>
                { this.state.movie.title }
                </h2>
                <img 
                    src={ this.state.movie.backdrop_path }
                    alt={ this.state.movie.title}/>
                </header>
                <img
                    src={ this.state.movie.poster_path}
                    alt={ this.state.movie.title}/>
            </div>
        )
        }
    }
    }



export default MovieDisplay;