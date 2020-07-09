import React from 'react';
import './movieDisplay.css';
import { getMovieData } from '../apiCalls';



class MovieDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            video: null,
            isLoaded: false,
            error: null,
            loggedIn: this.props.loggedIn

        }
    }



    componentDidMount() {
        Promise.all(getMovieData(this.props))
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
    }

     movieAndVideoState = (info) => {
         if (info) {
             console.log(info)
             this.setState({
                 movie: info[0].movie,
                 video: info[1].videos,
                   isLoaded: true,
             })
         }
     }

     updateRating = (event) => {
        console.log(this.state)
        event.preventDefault()
        this.setState({ userRating: event.target.value });
    }

    submitUserRating = (event) => {
        event.preventDefault()
        this.props.postUserRating(this.state.movie.id, this.state.userRating) 
    }

    render() {
        if (this.state.error) {
            return <h1>ERROR: {this.state.error.message}</h1>
         } else if (!this.state.isLoaded) {
            return <div>loading...</div>
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
                            alt={ this.state.movie.title }/>
                        <div className='inside'>
                        <h3>{ this.state.movie.title }</h3>
                        <p>Average Rating: { Math.round(this.state.movie.average_rating) }</p>
                        <p>Released: { this.state.movie.release_date }</p>
                        <p>{ this.state.movie.overview }</p>
                        </div>
                    </div>
                    <p>Genres:</p>
                    <ul>{ this.state.movie.genres.map(genre => <li>{genre}</li>) }</ul>
                    <p>Budget: { `$${this.state.movie.budget}` }</p>
                    <p>Revenue: { `$${this.state.movie.revenue}` }</p>
                    <p>Runtime: { this.state.movie.runtime }</p>
                        {this.state.loggedIn ? 
                        <form onSubmit={this.submitUserRating}>
                            <p>Current Rating: 
                                { this.props.rating ? this.props.rating.rating : 'Add a rating!' }
                            </p>
                        <select onChange={this.updateRating}> 
                            <option value="1" id="1">1</option>
                            <option value="2" id="2">2</option>
                            <option value="3" id="3">3</option>
                            <option value="4" id="4">4</option>
                            <option value="5" id="5">5</option>
                            <option value="6" id="6">6</option>
                            <option value="7" id="7">7</option>
                            <option value="8" id="8">8</option>
                            <option value="9" id="9">9</option>
                            <option value="10" id="10">10</option>
                        </select>
                        <button type="submit">Submit rating</button>
                    </form> : null}
                </section>
            </div>
        )
        }
    }
    }



export default MovieDisplay;