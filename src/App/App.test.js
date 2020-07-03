import React from 'react';
import App from './App';
import LoginForm from '../LoginForm/LoginForm'

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('App', () => {

  it('should render correctly', () => {
    const { getByText, getByRole } = render(<App />);

    const homeLink = getByText('Home');
    const loginLink = getByText('Login');
    
    expect(homeLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();

  });

  it('should be able to go to login page', () => {
    const { getByText } = render(<App />);
    const { getByPlaceholderText } = render(<LoginForm />);

    const logIn = getByText('Login');
    const emailInput = getByPlaceholderText('email');
    
    fireEvent.select(logIn);

    expect(emailInput).toBeInTheDocument();
  });

});