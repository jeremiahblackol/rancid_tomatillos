import React from 'react';
import LoginForm from './LoginForm';
import App from '../App/App';

import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';


describe('Login Form', () => {

    it('should render correctly', async () => {
      const { getByRole, getByPlaceholderText } = render( 
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>);
  
      const emailInput = await waitFor(() => getByPlaceholderText('email'));
      const passwordInput = await waitFor(() => getByPlaceholderText('password'));
      const loginButton = await waitFor(() => getByRole('button'));
      
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();

    });

    it('should be able to login', () => {
        const mockLogIn = jest.fn();
        const { getByRole } = render(
            <BrowserRouter>
                <LoginForm 
                    handleSubmit={mockLogIn}
                />
            </BrowserRouter>
            );
    
        const button = getByRole('button', {name: 'Log In'});
        fireEvent.click(button);
    
        expect(mockLogIn).toBeCalledTimes(1);
      });

      it('should render the homepage after logging in', async () => {
        const mockLogIn = jest.fn();
        const { getByRole } = render(
          <BrowserRouter>
              <LoginForm 
                  handleSubmit={mockLogIn}
              />
          </BrowserRouter>
          );

        const button = getByRole('button', {name: 'Log In'});
        fireEvent.click(button);

        const { getByText } = render( 
          <BrowserRouter>
            <App />
          </BrowserRouter>);
        
        const name = await waitFor(() => getByText('Rancid Tomatillos'));

        expect(mockLogIn).toBeCalledTimes(1);
        expect(name).toBeInTheDocument();
      });
  
  });