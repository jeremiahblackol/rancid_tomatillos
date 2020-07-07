import React from 'react';
import LoginForm from './LoginForm';
import App from '../App/App';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';


describe('Login Form', () => {

    it.skip('should render correctly', () => {
      const { getByText, getByRole, getByPlaceholderText } = render( 
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>);
  
      const emailInput = getByPlaceholderText('email');
      const passwordInput = getByPlaceholderText('password');
      const loginButton = getByRole('button');
      
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();

    });

    // it('should be able to login', () => {
    //     const mockLogIn = jest.fn();
    //     const { getByRole } = render(
    //         <BrowserRouter>
    //             <LoginForm 
    //                 handleSubmit={mockLogIn}
    //             />
    //         </BrowserRouter>
    //         );
    
    //     const button = getByRole('button', {name: 'Log In'});
    //     fireEvent.click(button);
    
    //     expect(mockLogIn).toBeCalledTimes(1);
    //   });

    //   it('should render the homepage after logging in', () => {
    //     const mockLogIn = jest.fn();
    //     const { getByRole } = render(
    //       <BrowserRouter>
    //           <LoginForm 
    //               handleSubmit={mockLogIn}
    //           />
    //       </BrowserRouter>
    //       );

    //     const button = getByRole('button', {name: 'Log In'});
    //     fireEvent.click(button);

    //     const { getByText } = render( 
    //       <BrowserRouter>
    //         <App />
    //       </BrowserRouter>);
        
    //     const name = getByText('Rancid Tomatillos');

    //     expect(mockLogIn).toBeCalledTimes(1);
    //     expect(name).toBeInTheDocument();
    //   });
  
  });