import React from 'react';
import './movies.css'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Movies extends React.Component {
    constructor() {
        super()
        this.state ={
            key: 0,
        }
    }

    render() {
    return (
        this.props.movies.map(movie => {
            return (
                <NavLink className='movie-card-nav' to={`/movies/${movie.id}`} key={movie.id}>
                <article 
                    className='movie-card' 
                    id={movie.id}
                    onClick={this.showPage}>
                    <img 
                        src={} 
                        alt={this.props.isFavorite ? 'favorite' : 'not favorite'} 
                        className='tomatillo-fave'
                    />
                    <img 
                        src={movie.poster_path} 
                        alt={`${movie.title} poster`}
                        className='movie-card-poster' 
                    />
                    <h3 className='movie-card-title'>{movie.title}</h3>
                    <p className='movie-card-text'> Average rating: {Math.round(movie.average_rating)}</p>
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