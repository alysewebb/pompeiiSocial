/**
 * Test the HomePage
 */

import React from 'react';
import { render } from 'react-testing-library';

import HomePage from '../index';

describe('<HomePage />', () => {
  it('should render an ascii narwhal and none of the boilerplate copy', () => {
    const { getByRole, queryByText } = render(<HomePage />);
    const art = getByRole('img', { name: 'An ASCII art narwhal' });

    expect(art.textContent).toContain('\\\\');
    expect(queryByText(/react project/i)).toBeNull();
    expect(queryByText(/github repositories/i)).toBeNull();
  });
});
