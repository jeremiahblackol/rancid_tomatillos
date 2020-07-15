import React from 'react';
import Movies from '../Movies/Movies';
import PropTypes from 'prop-types';

function Home(props) {
    return (
        <div className="App">
            <section className='movie-card-section' id='home-component'>
                <Movies movies={props.allMovies} loggedIn={props.loggedIn} favorites={props.favorites}/>
            </section> 
        </div>
    )
}

export default Home;

Home.propTypes = {
    allMovies: PropTypes.array
}