import React from 'react';
import './App.css';
import Movies from './Movies';
import Header from './Header';
import LoginForm from './LoginForm'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      allMovies: [],
    }
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => response.json())
      .then(
        (data) => {
          this.setState({
        isLoaded: true, 
        allMovies: data.movies 
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          })
        }
      )
  }

  handleClick = () => {
    console.log('hello')
  }

  render(props) {
    const { error, isLoaded, allMovies } = this.state;
    
    if (error) {
      return <h1>ERROR: {error.message}</h1>
    } else if (!isLoaded) {
      return <div>loading...</div>
    } else {
      return (
        <div className="App">
          <Header handleClick={this.handleClick}/>
          <section className='movie-card-section'>
            <Movies movies={allMovies}/>
          </section>
        </div>
      );
    }
  }
}

export default App;
