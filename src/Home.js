import React from 'react'
import Header from './Header'
import Movies from './Movies'

function Home(props) {
    if (props.error) {
    return <h1>ERROR: {props.error.message}</h1>
    } else if (!props.isLoaded) {
    return <div>loading...</div>
    } else {
        return (
        <div className="App">
        <Header />
        <section className='movie-card-section'>
            <Movies movies={props.allMovies}/>
        </section>
        </div>
        )
    }
}

export default Home;