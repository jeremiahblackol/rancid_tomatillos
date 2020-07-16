import React from 'react';
import './movieDisplay.css';
import { getMovieData, postNewRating, removeRating, fetchFavorites, deleteFavorite, addFavorite } from '../apiCalls';



class MovieDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            loggedIn: this.props.loggedIn,
            ratingValue: '',
            allRatings: this.props.ratings,
            faves: [],
        }
    }

    componentDidMount() {
        Promise.all(getMovieData(this.props.movieID))
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
          this.getFaves()
        
    }

    toggleFavorite = (event) => {
        let movie = this.state.movie;
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

     movieAndVideoState = (info) => {
         if (info) {
             this.setState({
                movie: info[0].movie,
                video: info[1].videos,
                isLoaded: true,
             })
         }
     }

    postUserRating = (event, movieID, ratingvalue) => {
        event.preventDefault()
        postNewRating(this.props.userInfo.id, movieID, Number(ratingvalue))
            .then(() => this.props.getUserRatings(this.props.userInfo))
            .catch(err => console.error(err))
    }

    deleteRating = (event, ratingId) => {
        event.preventDefault();
        let ratingsDuplicate = [...this.props.ratings];
        let newRatings = ratingsDuplicate.reduce((ratings, movie) => {
            if (movie.movie_id !== this.props.movieID) {
                ratings.push(movie)
            }
            return ratings;
        }, [])
        this.setState({...this.state, ratingValue: '', ratings: newRatings})
        removeRating(this.props.userInfo.id, ratingId)
            .then(() => this.props.getUserRatings(this.props.userInfo))
            .catch(err => console.error(err))
    }

    handleChange = (event) => {
        this.setState({ ratingValue: event.target.value });
    }

    showRatingForm = () => {
        let foundRating = this.props.ratings.find(movie => movie.movie_id === this.state.movie.id)
        if (!foundRating) {
            return (            
                <form onSubmit={(event) => this.postUserRating(event, this.props.movieID, this.state.ratingValue)}>
                    <label>Add a rating:
                        <input 
                            type= 'number' 
                            name= 'ratingValue' 
                            className= 'rating-input' 
                            min='1'
                            max='10'
                            onChange={this.handleChange}
                            value= {this.state.ratingValue}>
                        </input>
                    </label>
                    <button type='submit'>Submit rating</button>
                </form>);
        } else if (foundRating) {
            return (            
                <form onSubmit={(event) => this.deleteRating(event, foundRating.id, this.props.movieID)}>
                    <p>Rating: {foundRating.rating}</p> 
                    <button>Change Rating</button>
                </form>
        );
        } else {
            return null;
        }
    }

    showFavorite = () => {
        let isFavorite = this.state.faves.find(fave => fave.id === this.props.movieID)
        return (
            <img
                data-fave={isFavorite}
                data-id={this.props.movieID} 
                src={isFavorite ? require('../images/tomatillo-yes.png') : require('../images/tomatillo-no.png')} 
                alt={isFavorite ? 'favorite' : 'not favorite'} 
                className='tomatillo-fave'
                onClick={(event) => this.toggleFavorite(event)}
            />)
    }

    render() {
        if (this.state.error) {
            return <h1>ERROR: {this.state.error.message}</h1>
         } else if (!this.state.isLoaded) {
            return <div>Loading...</div>
         } else {

        return (
            <div>
                <header className='movie-display-header'>
                <h2 className='movie-display-title'>
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
                            alt={ this.state.movie.title }
                            className='movie-display-poster'    
                        />
                        <div className='inside'>
                        <h3>{ this.state.movie.title }</h3>
                        <p>Average Rating: { Math.round(this.state.movie.average_rating) }</p>
                        <p>Released: { this.state.movie.release_date }</p>
                        <p>{ this.state.movie.overview }</p>
                        {this.props.loggedIn ? this.showFavorite() : null}
                        {this.props.loggedIn ? this.showRatingForm() : null}
                        </div>
                    </div>
                    <p>Genres:</p>
                    <ul>{ this.state.movie.genres.map(genre => <li key={genre.id}>{genre}</li>) }</ul>
                    <p>Budget: { `$${this.state.movie.budget}` }</p>
                    <p>Revenue: { `$${this.state.movie.revenue}` }</p>
                    <p>Runtime: { this.state.movie.runtime } minutes</p>
                </section>
            </div>
        )
        }
    }
    }

export default MovieDisplay;