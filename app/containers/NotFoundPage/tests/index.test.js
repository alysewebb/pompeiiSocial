/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

import NotFound from '../index';
import messages from '../messages';

describe('<NotFound />', () => {
  it('should explain the missing page and link back to the feed', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <IntlProvider locale="en">
          <NotFound />
        </IntlProvider>
      </MemoryRouter>,
    );
    const home = queryByText(messages.home.defaultMessage);

    expect(queryByText('404')).not.toBeNull();
    expect(queryByText(messages.body.defaultMessage)).not.toBeNull();
    expect(home).not.toBeNull();
    expect(home.getAttribute('href')).toBe('/');
  });
});
