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

function drawingCaption(caption) {
  return typeof caption === 'string' && /drawing/i.test(caption)
    ? caption
    : null;
}

function tallyCaption(caption) {
  return typeof caption === 'string' && /tally/i.test(caption) ? caption : null;
}

function englishDescription(graffiti) {
  if (typeof graffiti.descriptionInEnglish === 'string') {
    return graffiti.descriptionInEnglish;
  }

  const nested =
    graffiti.figuralInfo && graffiti.figuralInfo.descriptionInEnglish;
  return typeof nested === 'string' ? nested : '';
}

function longerCaption(graffiti) {
  const caption = typeof graffiti.caption === 'string' ? graffiti.caption : '';
  const description = englishDescription(graffiti);

  return description.length > caption.length ? description : caption;
}

function decodeEntities(value) {
  return value.replace(/&#(\d+);|&#x([0-9a-fA-F]+);/g, (_, decimal, hex) =>
    String.fromCodePoint(hex ? parseInt(hex, 16) : parseInt(decimal, 10)),
  );
}

function inscription(graffiti) {
  return typeof graffiti.content === 'string'
    ? decodeEntities(graffiti.content)
    : '';
}

function latinDescription(graffiti) {
  if (typeof graffiti.descriptionInLatin === 'string') {
    return graffiti.descriptionInLatin;
  }

  const nested =
    graffiti.figuralInfo && graffiti.figuralInfo.descriptionInLatin;
  return typeof nested === 'string' ? nested : '';
}

function Post({ graffiti, image, imageAlt, comments, likes, avatar, language }) {
  const tally = tallyCaption(graffiti.caption);
  const imageLabel = image ? longerCaption(graffiti) : '';
  let caption = imageLabel || drawingCaption(graffiti.caption);
  const latinCaption = latinDescription(graffiti);

  if (language === 'Latin' && image && caption && latinCaption) {
    caption = latinCaption;
  }

  const text =
    language === 'Latin' && graffiti.contentTranslation
      ? inscription(graffiti)
      : graffiti.contentTranslation;

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
          {(text || tally) && (
            <p
              className={
                language === 'Latin' ? 'post-text post-text--latin' : 'post-text'
              }
            >
              {text}
              {tally && <em className="post-tally"> ({tally})</em>}
            </p>
          )}
          {image && (
            <img
              className="post-photo"
              src={image}
              alt={
                language === 'Latin' && image && caption && latinCaption
                  ? caption
                  : imageLabel || imageAlt
              }
            />
          )}
          {caption && <p className="post-caption">{caption}</p>}
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
    content: PropTypes.string,
    contentTranslation: PropTypes.string,
    caption: PropTypes.string,
    descriptionInEnglish: PropTypes.string,
    descriptionInLatin: PropTypes.string,
    figuralInfo: PropTypes.shape({
      descriptionInEnglish: PropTypes.string,
      descriptionInLatin: PropTypes.string,
    }),
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
  language: PropTypes.oneOf(['English', 'Latin']),
};

Post.defaultProps = {
  image: null,
  imageAlt: '',
  language: 'English',
};

export default Post;
