/**
 * Post
 *
 * One item in the feed: avatar, location, text, optional photo, and actions.
 */

import React from 'react';
import PropTypes from 'prop-types';

import pin from '../../images/feed/pin.svg';
import commentIcon from '../../images/feed/comment.svg';
import heartIcon from '../../images/feed/heart.svg';
import shareIcon from '../../images/feed/share.svg';
import ellipsisIcon from '../../images/feed/ellipsis.svg';
import './index.css';

function Action({ icon, label, count }) {
  return (
    <button
      className="post-action"
      type="button"
      aria-label={count == null ? label : `${label}, ${count}`}
    >
      <img src={icon} alt="" />
      {count != null && <span className="post-count">{count}</span>}
    </button>
  );
}

Action.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
};

Action.defaultProps = {
  count: null,
};

function postLocation(graffiti) {
  const city = graffiti.property.insula.city.name;
  const propertyName = graffiti.property.englishPropertyName;
  const streetName =
    graffiti.segment &&
    graffiti.segment.street &&
    graffiti.segment.street.streetName;
  const place = propertyName || streetName;

  return place ? `${city}, ${place}` : city;
}

function Post({ graffiti, image, imageAlt, comments, likes, avatar }) {
  return (
    <article className="post">
      <div className="post-content">
        <div className="post-avatar">
          <img className="post-backdrop" src={avatar.backdrop} alt="" />
          <img
            className={`post-silhouette post-silhouette--${avatar.placement}`}
            src={avatar.silhouette}
            alt=""
          />
        </div>
        <div className="post-body">
          <div className="post-location">
            <img src={pin} alt="" />
            <p className="post-location-name">{postLocation(graffiti)}</p>
          </div>
          <p className="post-text">{graffiti.contentTranslation}</p>
          {image && <img className="post-photo" src={image} alt={imageAlt} />}
          <div className="post-actions">
            <div className="post-action-group">
              <Action icon={commentIcon} label="Replies" count={comments} />
              <Action icon={heartIcon} label="Likes" count={likes} />
              <Action icon={shareIcon} label="Share" />
            </div>
            <Action icon={ellipsisIcon} label="More" />
          </div>
        </div>
      </div>
    </article>
  );
}

Post.propTypes = {
  graffiti: PropTypes.shape({
    contentTranslation: PropTypes.string.isRequired,
    property: PropTypes.shape({
      englishPropertyName: PropTypes.string,
      insula: PropTypes.shape({
        city: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    segment: PropTypes.shape({
      street: PropTypes.shape({
        streetName: PropTypes.string,
      }),
    }),
  }).isRequired,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  comments: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  avatar: PropTypes.shape({
    backdrop: PropTypes.string.isRequired,
    silhouette: PropTypes.string.isRequired,
    placement: PropTypes.oneOf(['bun', 'profile', 'veil', 'beard']).isRequired,
  }).isRequired,
};

Post.defaultProps = {
  image: null,
  imageAlt: '',
};

export default Post;
