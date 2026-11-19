/**
 * NewPostDialog
 *
 * The message shown by either New post button.
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import eruptionMobile from '../../images/feed/eruption-mobile.svg';
import eruptionDesktop from '../../images/feed/eruption-desktop.svg';
import './index.css';

const ERUPTION_YEAR = 79;

function yearsSinceEruption(date = new Date()) {
  return date.getFullYear() - ERUPTION_YEAR;
}

export default function NewPostDialog({ onClose }) {
  const closeButton = useRef(null);

  useEffect(() => {
    closeButton.current.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="new-post-overlay">
      <div
        className="new-post-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-post-title"
      >
        <div className="new-post-art">
          <img
            className="new-post-eruption new-post-eruption--mobile"
            src={eruptionMobile}
            alt=""
          />
          <img
            className="new-post-eruption new-post-eruption--desktop"
            src={eruptionDesktop}
            alt=""
          />
        </div>
        <div className="new-post-copy">
          <h2 className="new-post-title" id="new-post-title">
            Oops!
          </h2>
          <p className="new-post-message">
            You’re {yearsSinceEruption().toLocaleString('en-US')} years too
            late to post here.
          </p>
          <button
            className="new-post-ok"
            type="button"
            ref={closeButton}
            onClick={onClose}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

NewPostDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
};
