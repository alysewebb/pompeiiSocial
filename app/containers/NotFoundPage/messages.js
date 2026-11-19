/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.NotFoundPage';

export default defineMessages({
  body: {
    id: `${scope}.body`,
    defaultMessage: 'Oops! The page you’re looking for doesn’t exist.',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Go Back Home',
  },
});
