import React from 'react';
import App from './App';
import LoginForm from '../LoginForm/LoginForm'

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';


describe('App', () => {

  it('should render correctly', () => {
    const { getByText, getByRole } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>);

    const homeLink = getByText('Home');
    const loginLink = getByText('Login');
    
    expect(homeLink).toBeInTheDocument();
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

});