import React from 'react';

function Movies(props) {
    return (
        props.movies.map(movie => {
            return (
                <article className='movie-card' key={movie.id}>
                    <img src={movie.poster_path}/>
                    <p>{movie.title}</p>
                    <p>{movie.average_rating}</p>
                </article>
            )
        })
    )
}

export default Movies;