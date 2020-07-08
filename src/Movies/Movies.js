import React from 'react';
import './movies.css'
import MovieDisplay from '../MovieDisplay/MovieDisplay'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Movies extends React.Component {
    constructor() {
        super()
        this.state ={
            key: 0,
        }
    }

    showPage = (event) => {
        console.log(event.target.parentNode.id)
        // this.props.showMoviePage(event.target.parentNode.id)
    }

    render() {
    return (
        this.props.movies.map(movie => {
            return (
                <NavLink to={`/movies/${movie.id}`} key={movie.id}>
                <article 
                    className='movie-card' 
                     
                    id={movie.id}
                    onClick={this.showPage}
                >
                    <img 
                        src={movie.poster_path} 
                        alt={`${movie.title} poster`} 
                        
                    />
                    <h3>{movie.title}</h3>
                    <p> Average rating: {Math.round(movie.average_rating)}</p>
                </article>
                </NavLink>
            )
        })
    )
    }
}

Movies.propTypes = {
    movies: PropTypes.array,
}

export default Movies;