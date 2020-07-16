import React from 'react';
import './movies.css'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchFavorites, deleteFavorite, addFavorite } from '../apiCalls';

class Movies extends React.Component {
    constructor() {
        super()
        this.state = {
            faves: [],
        }
    }
    
    componentDidMount() {
        this.getFaves();
    }
    
    toggleFavorite = (event, movie) => {
        let data = event.target.dataset;
        if (data.fave) {
            this.removeFave(Number(data.id))
        } else if (!data.fave) {
            this.addFave(Number(data.id), movie)
        }
    }
    
    getFaves = () => {
        fetchFavorites()
            .then(data => this.setState({ faves: data }))
            .catch(err => console.error(err))
    }

    removeFave = (id) => {
        deleteFavorite(id)
            .then(() => this.getFaves())
            .catch(err => console.error(err))
    }

    addFave = (id, movie) => {
        addFavorite(id, movie)
            .then(() => this.getFaves())
            .catch(err => console.error(err))
    }

    render() {
        return (
            this.props.movies.map(movie => {
                let isFavorite = this.state.faves.find(fave => fave.id === movie.id);
                return (
                    <div className='movie-container'>
                    {this.props.loggedIn ? <img 
                        src={isFavorite ? require('../images/tomatillo-yes.png') : require('../images/tomatillo-no.png')} 
                        alt={isFavorite ? 'favorite' : 'not favorite'} 
                        className='tomatillo-fave-main'
                        onClick={(event) => this.toggleFavorite(event, movie)}
                        data-id={movie.id}
                        data-fave={isFavorite}
                    />: null}
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