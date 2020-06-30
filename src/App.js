import React from 'react';
import './App.css';

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
      
      </div>
    );
  }
}

export default App;
