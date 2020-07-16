import React from 'react';
import './Favorites.css';
import {
    BrowserRouter as NavLink,
  } from "react-router-dom";
import { fetchFavorites, deleteFavorite, addFavorite } from '../apiCalls';


class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: this.props.loggedIn,
            faves: [],
        }
    }

    componentDidMount() {
        this.getFaves();
    }
    
    getFaves = () => {
        fetchFavorites()
            .then(data => this.setState({ faves: data }))
            .catch(err => console.error(err))
    }

    removeFave = (event) => {
        let data = event.target.dataset;
        deleteFavorite(Number(data.id))
            .then(() => this.getFaves())
            .catch(err => console.error(err))
    }

    render() {
        if (this.state.loggedIn) {
            return <div className='four-oh-four'>
                <h3 className='favorite-header'>404: Page Not Found</h3>
                <a className='login-link' href='/'>Go Home</a>
            </div>
        } else {
            return (!this.state.faves.length === 0) ? (
                <>
                <h3 className='favorite-header'>Your Favorite Movies:</h3>
                <section className='movie-card-section'>
                    {this.state.faves.map(movie => {
                    return(
                    <div className='movie-container-faves'>
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
                        <button data-id={movie.id} className='remove-fave' onClick={(event) => this.removeFave(event)}>Remove Favorite</button>
                    </div>
                    )
                })}
                </section>
                </>
            ) : 
            <div className='four-oh-four'>
                <h3 className='favorite-header'>You don't have any favorite movies yet!</h3>
                <NavLink to='/'><button className='remove-fave'>Home</button></NavLink>
            </div>;
        }
        
    }
}

export default Favorites;