/**
 * NotFoundPage
 *
 * Shown when the user visits a url that doesn't have a route.
 * "Go Back Home" returns to the feed.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import eruptionMobile from '../../images/feed/eruption-mobile.svg';
import eruptionDesktop from '../../images/feed/eruption-desktop.svg';
import messages from './messages';
import './index.css';

export default function NotFound() {
  return (
    <main className="not-found">
      <img
        className="not-found__volcano not-found__volcano--mobile"
        src={eruptionMobile}
        alt=""
      />
      <img
        className="not-found__volcano not-found__volcano--desktop"
        src={eruptionDesktop}
        alt=""
      />
      <div className="not-found__copy">
        <p className="not-found__code">404</p>
        <p className="not-found__message">
          <FormattedMessage {...messages.body} />
        </p>
      </div>
      <Link className="not-found__home" to="/">
        <FormattedMessage {...messages.home} />
      </Link>
    </main>
  );
}
