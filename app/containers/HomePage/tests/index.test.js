/**
 * Test the HomePage
 */

import React from 'react';
import { render } from 'react-testing-library';

import HomePage from '../index';

describe('<HomePage />', () => {
  it('should render a scrollable feed of posts', () => {
    const { getAllByText, getByText } = render(<HomePage />);

    expect(
      getByText('Took the long way home. Always take the long way home.'),
    ).toBeTruthy();
    expect(
      getAllByText('This is exactly why I’m here. More of this, please.'),
    ).toHaveLength(2);
    expect(getByText('Discover')).toBeTruthy();
  });
});
