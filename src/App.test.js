import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getByTestId } from '@testing-library/jest-dom/matchers';
import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('renders name of website', () => {
  const { getByTestId } = render(<App />);
  // const headerName = getByText(/Rotten Tomatillos/i);
  // expect(headerName).toBeInTheDocument();
  expect(
    getByTestId(document.documentElement, 'header'),
  ).toBeInTheDocument()
  expect(
    getByTestId(document.documentElement, 'does-not-exist'),
  ).not.toBeInTheDocument()
});
