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
      })
    })
      .then(response => response.json())
}

export const fetchUserRatings = (id) => {
  console.log('fetch')
    return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`)
      .then(response => response.json())
}

export const getMovieData = (movieID) => {
    return [
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieID}`)
    .then(response => response.json()),
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieID}/videos`)
    .then(response => response.json())]
}

export const postNewRating = async (userID, movieID, newRating) => {
  console.log('post userID', userID);
  console.log('post movieID', movieID);
  console.log('post rating', newRating);
  let rating = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userID}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify({ 
      movie_id: movieID, 
      rating: newRating
    })
  })
  if (!rating.ok) {
    throw new Error('Movie submit failed')
  } else {
    let response = await rating.json()
    return response;
  }
}

export const removeRating = async (userID, ratingID) => {
  let rating = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userID}/ratings/${ratingID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
  return rating;
}