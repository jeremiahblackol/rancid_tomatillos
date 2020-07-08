import React from 'react';
import Header from './Header';
import App from '../App/App';

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {

    it('should render correctly if not logged in', async () => {
      const { getByText } = render( 
      <BrowserRouter>
        <App />
      </BrowserRouter>);
  
      const title = await waitFor(() => getByText('Rancid Tomatillos'));
      
      expect(title).toBeInTheDocument();
    });

});