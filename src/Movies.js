import React from 'react';
import './movies.css'

function Movies(props) {
    return (
        props.movies.map(movie => {
            return (
                <article className='movie-card' key={movie.id}>
                    <img src={movie.poster_path} alt={`${movie.title} poster`}/>
                    <h3>{movie.title}</h3>
                    <p>Average rating: {movie.average_rating}</p>
                </article>
            )
        })
    )
}

export default Movies;