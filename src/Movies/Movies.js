import React from 'react';
import './movies.css'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchFavorites } from '../apiCalls';

class Movies extends React.Component {
    
    componentDidMount() {
        fetchFavorites();
            .then()
    }
    
    toggleFavorite = () => {

    }

    render() {
        return (
            this.props.movies.map(movie => {
                let isFavorite;
                if (this.props.loggedIn) {
                    isFavorite = this.props.favorites.find(fave => fave.id === movie.id)
                    console.log('fave?', isFavorite);
                }
                return (
                    <div className='movie-container'>
                    <img 
                            src={isFavorite ? require('../images/tomatillo-yes.png') : require('../images/tomatillo-no.png')} 
                            alt={isFavorite ? 'favorite' : 'not favorite'} 
                            className='tomatillo-fave-main'
                            onClick={this.toggleFavorite}
                            data-id={movie.id}
                    />
                    <NavLink className='movie-card-nav' to={`/movies/${movie.id}`} key={movie.id}>
                    <article 
                        className='movie-card' 
                        id={movie.id}>
                        <img 
                            src={movie.poster_path} 
                            alt={`${movie.title} poster`}
                            className='movie-card-poster' 
                        />
                        <h3 className='movie-card-title'>{movie.title}</h3>
                        <p className='movie-card-text'> Average rating: {Math.round(movie.average_rating)}</p>
                    </article>
                    </NavLink>
                    </div>
                )
            })
        )
    }
}

Movies.propTypes = {
    movies: PropTypes.array,
}

export default Movies;