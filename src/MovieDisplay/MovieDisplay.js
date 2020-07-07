import React from 'react';
import './movieDisplay.css';

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Redirect
//   } from "react-router-dom";


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
                <header className='movie-display-header'>
                <h2>
                { this.state.movie.title }
                </h2>
                <img 
                    className='backdrop'
                    src={ this.state.movie.backdrop_path }
                    alt={ this.state.movie.title}/>
                <p className='tagline'>{this.state.movie.tagline}</p>
                </header>
                <section className='movie-display-body'>
                    <div className='poster-section'>
                        <img
                            src={ this.state.movie.poster_path }
                            alt={ this.state.movie.title }/>
                        <div className='inside'>
                        <h3>{ this.state.movie.title }</h3>
                        <p>Average Rating: { Math.round(this.state.movie.average_rating) }</p>
                        <p>Released: { this.state.movie.release_date }</p>
                        <p>{ this.state.movie.overview }</p>
                        </div>
                    </div>
                    <p>Genres:</p>
                    <ul>{ this.state.movie.genres.map(genre => <li>{genre}</li>) }</ul>
                    <p>Budget: { `$${this.state.movie.budget}` }</p>
                    <p>Revenue: { `$${this.state.movie.revenue}` }</p>
                    <p>Runtime: { this.state.movie.runtime }</p>
                    {/* <a>{this.state.video.type}</a> */}
                </section>
            </div>
        )
        }
    }
    }



export default MovieDisplay;