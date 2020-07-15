import React from 'react';
import {
    BrowserRouter as NavLink,
  } from "react-router-dom";

class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: this.props.loggedIn,
        }
    }

    render() {
        console.log(this.props);
        return (
            this.props.favorites.map(movie => {
                return(<NavLink className='movie-card-nav' to={`/movies/${movie.id}`} key={movie.id}>
                <article 
                    className='movie-card' 
                    id={movie.id}
                    onClick={this.showPage}>
                    <img 
                        src={movie.poster_path} 
                        alt={`${movie.title} poster`}
                        className='movie-card-poster' 
                    />
                    <h3 className='movie-card-title'>{movie.title}</h3>
                    <p className='movie-card-text'> Average rating: {Math.round(movie.average_rating)}</p>
                </article>
                </NavLink>)
            })
        )
    }
}

export default Favorites;