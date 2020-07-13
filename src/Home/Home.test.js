import React from 'react';
import Home from './Home';
import App from '../App/App';

import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

describe('Home', () => {
    it.skip('should render correctly on page load', async () => {
        const { getByText, debug } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        const movieInHome = await waitFor(() => {getByText('Artemis Fowl')});
        
        expect(movieInHome).toBeInTheDocument();
    }) 
});