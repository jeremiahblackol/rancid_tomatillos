import React from 'react';
import './App.css';
import Movies from './Movies';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allMovies: [],
    }
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => response.json())
      .then(data => this.setState({ allMovies: data.movies }))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="App">
        <Movies movies={this.state.allMovies}/>
      </div>
    );
  }
}

export default App;
