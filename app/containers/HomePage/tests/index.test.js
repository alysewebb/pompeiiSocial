/**
 * Test the HomePage
 */

import React from 'react';
import { render } from 'react-testing-library';

import HomePage from '../index';

describe('<HomePage />', () => {
  it('should render a scrollable feed of posts', () => {
    const { getAllByText, getByText } = render(<HomePage />);

    expect(getByText('Fab(ius)')).toBeTruthy();
    expect(getByText('Herculaneum, House of the Bicentenary')).toBeTruthy();
    expect(getAllByText('Herculaneum, Cardo IV').length).toBeGreaterThan(0);
    expect(getByText('Discover')).toBeTruthy();
  });
});
