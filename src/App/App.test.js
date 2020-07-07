import React from 'react';
import App from './App';
import LoginForm from '../LoginForm/LoginForm';
import Movies from '../Movies/Movies';
import { getAllMovies } from '../apiCalls';

import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
jest.mock('../apiCalls');


describe('App', () => {
  getAllMovies.mockResolvedValue([
    {
    "id": 475430,
    "poster_path": "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
    "title": "Artemis Fowl",
    "average_rating": 6.333333333333333,
    "release_date": "2020-06-12"
    },
    {
    "id": 338762,
    "poster_path": "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
    "backdrop_path": "https://image.tmdb.org/t/p/original//lP5eKh8WOcPysfELrUpGhHJGZEH.jpg",
    "title": "Bloodshot",
    "average_rating": 9.5,
    "release_date": "2020-03-05"
  }]);

  getAllMovies.mockRejectedValue("THIS IS THE REJECTED VALUE");

  it('should render correctly', () => {
    const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);

    const loginLink = getByText('Login');
    
    expect(loginLink).toBeInTheDocument();

  });

  it('should be able to go to login page', () => {
    const { getByText } = render( 
    <BrowserRouter>
      <App />
    </BrowserRouter>);
    const { getByPlaceholderText } = render( <BrowserRouter>
      <LoginForm />
    </BrowserRouter>);

    const logIn = getByText('Login');
    const emailInput = getByPlaceholderText('email');
    
    fireEvent.select(logIn); 

    expect(emailInput).toBeInTheDocument();
  });

  it('should fetch all movies on load', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>  );

    const container = getByText('Rancid Tomatillos');
    expect(container).toBeInTheDocument();

    const movieOne = await waitForElement(() => getByText('Artemis Fowl')); 
    expect(movieOne).toBeInTheDocument();
  });

});