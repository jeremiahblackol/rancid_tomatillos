import React from 'react';
import './movies.css'
import MovieDisplay from '../MovieDisplay/MovieDisplay'
import { NavLink } from 'react-router-dom';

class Movies extends React.Component {
    constructor() {
        super()
    }

    showPage = (event) => {
        console.log(event.target.parentNode.id)
        // this.props.showMoviePage(event.target.parentNode.id)
    }

    render() {
    return (
        this.props.movies.map(movie => {
            return (
                <NavLink to={`/movies/${movie.id}`}>
                <article 
                    className='movie-card' 
                    key={movie.id * 2} 
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

export default Movies;