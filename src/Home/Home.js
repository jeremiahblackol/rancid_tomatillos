import React from 'react';
import Movies from '../Movies/Movies';
import PropTypes from 'prop-types';

function Home(props) {
    // console.log('props', props);
    return (
        <div className="App">
            <section className='movie-card-section'>
                <Movies movies={props.allMovies}/>
            </section> 
        </div>
    )
}

export default Home;

Home.propTypes = {
    allMovies: PropTypes.array
}

// Home.defaultProps = {
//     allMovies: [{
//         "id": 475430,
//         "poster_path": "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
//         "backdrop_path": "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
//         "title": "Artemis Fowl",
//         "average_rating": 6.333333333333333,
//         "release_date": "2020-06-12"
//         },
//         {
//         "id": 338762,
//         "poster_path": "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
//         "backdrop_path": "https://image.tmdb.org/t/p/original//lP5eKh8WOcPysfELrUpGhHJGZEH.jpg",
//         "title": "Bloodshot",
//         "average_rating": 9.5,
//         "release_date": "2020-03-05"
//       }]
// }