import React from 'react';
import LoginForm from './LoginForm';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Login Form', () => {

    it('should render correctly', () => {
      const { getByText, getByRole, getByPlaceholderText } = render(<LoginForm />);
  
      const emailInput = getByPlaceholderText('email');
      const passwordInput = getByPlaceholderText('password');
      const loginButton = getByRole('button');
      
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();

    });

    it('should be able to login', () => {
        const mockLogIn = jest.fn();
        const { getByRole } = render(
            <LoginForm 
                handleClick={mockLogIn}
            />);
    
        const button = getByRole('button', {name: 'Log In'});
        fireEvent.click(button);
    
        expect(mockLogIn).toBeCalledTimes(1);
      });
  
  });