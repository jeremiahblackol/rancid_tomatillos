import React from 'react';


class MovieDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
            movie: {},
            video: []
        }
    }

    //need to be able to fetch a single movie
    //fetch a single movie's videos
    //creating movie display component
    //error handling for bad requests

    componentDidMount() {
        Promise.all([
            fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.movieId}`),
            fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.movieId}/videos`),

        ]).then(response => response.json())
        //need to pass the movie id in when a movie card is clicked
        //need to add a click event to movie cards
        .then((data) =>  {
            this.setState({
                movie: data[0],
                video: data[1]
        })
        .catch(err => console.error(err))
        //   (error) => {
        //     this.setState({
        //       isLoaded: true,
        //       error,
        //     })
          }
        )
    }

    render() {
        console.log('hello')
        return (

            <div>
                <p>
                Hello
                </p>
            </div>
        )
    }
}

export default MovieDisplay;