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
            video: null
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
        .then(data => this.movieAndVideoState(data))

        .catch(err => console.error(err))
        //   (error) => {
        //     this.setState({
        //       isLoaded: true,
        //       error,
            // })
        //   }
        // )
    }

    movieAndVideoState = (info) => {
        if (info) {
            this.setState({
                movie: info[0].movie,
                video: info[1].videos
            })
        }

        console.log(this.state)
    }

    render() {
        console.log(this.props.movie)
        return (
            <div>
                <p>
                Hello
                </p>
            </div>
        )
    }
}

export default MovieDisplay;