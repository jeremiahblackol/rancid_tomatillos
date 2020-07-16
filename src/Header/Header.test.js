import React from 'react';
import Header from './Header';
import App from '../App/App';

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {

    it('should render correctly if not logged in', async () => {
      const { getByText } = render( 
      <MemoryRouter>
        <App />
      </MemoryRouter>);
  
      const title = await waitFor(() => getByText('Rancid Tomatillos'));
      
      expect(title).toBeInTheDocument();
    });

    it('should render correctly if logged in', async () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      const { getByText } = render(
        <MemoryRouter>
          <Header 
            userInfo={{name: 'Dr. React Router DOM Test'}}
          />
        </MemoryRouter>
      );

      const name = getByText('Welcome, Dr. React Router DOM Test!');
      expect(name).toBeInTheDocument();
    });

});