export const getAllMovies = () => {
    return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(response => response.json())
}

export const attemptLogIn = (info) => {
    return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password
      }),
    })
      .then(response => response.json())
}

export const fetchUserRatings = (info) => {
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${info.id}/ratings`)
      .then(response => response.json())
}

export const getMovieData = (info) => {
    return [
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${info.movie.id}`)
    .then(response => response.json()),
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${info.movie.id}/videos`)
    .then(response => response.json())]
}