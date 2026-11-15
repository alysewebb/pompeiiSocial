/**
 * Post
 *
 * One item in the feed: avatar, location, text, optional photo, and actions.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import pin from '../../images/feed/pin.svg';
import commentIcon from '../../images/feed/comment.svg';
import heartIcon from '../../images/feed/heart.svg';
import shareIcon from '../../images/feed/share.svg';
import ellipsisIcon from '../../images/feed/ellipsis.svg';

const placements = {
  bun: {
    top: '4px',
    left: '4px',
    transform: 'scaleY(-1) rotate(180deg)',
  },
  profile: {
    top: '6.48px',
    left: '7.4px',
  },
  veil: {
    top: '4.11px',
    left: '3.33px',
  },
  beard: {
    top: '5px',
    left: '5px',
  },
};

const Article = styled.article`
  border-bottom: 1px solid #e3e8ec;
  padding: 12px;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const Avatar = styled.div`
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 21px;
  overflow: hidden;
  flex-shrink: 0;
`;

const Backdrop = styled.img`
  display: block;
  width: 42px;
  height: 42px;
`;

const Silhouette = styled(({ placement, ...rest }) => <img alt="" {...rest} />)`
  position: absolute;
  display: block;
  mix-blend-mode: multiply;
  top: ${props => props.placement.top};
  left: ${props => props.placement.left};
  transform: ${props => props.placement.transform || 'none'};
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LocationName = styled.p`
  margin: 0;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
  color: #687787;
`;

const Text = styled.p`
  margin: 0;
  width: 100%;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 21px;
  color: #101820;
`;

const Photo = styled.img`
  display: block;
  width: 100%;
  height: 196px;
  object-fit: cover;
  border-radius: 12px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 5px;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const Count = styled.span`
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: normal;
  color: #687787;
`;

function Action({ icon, label, count }) {
  return (
    <ActionButton
      type="button"
      aria-label={count == null ? label : `${label}, ${count}`}
    >
      <img src={icon} alt="" />
      {count != null && <Count>{count}</Count>}
    </ActionButton>
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

function Post({ location, text, image, imageAlt, comments, likes, avatar }) {
  return (
    <Article>
      <Content>
        <Avatar>
          <Backdrop src={avatar.backdrop} alt="" />
          <Silhouette
            src={avatar.silhouette}
            placement={placements[avatar.placement]}
          />
        </Avatar>
        <Body>
          <Location>
            <img src={pin} alt="" />
            <LocationName>{location}</LocationName>
          </Location>
          <Text>{text}</Text>
          {image && <Photo src={image} alt={imageAlt} />}
          <Actions>
            <ActionGroup>
              <Action icon={commentIcon} label="Replies" count={comments} />
              <Action icon={heartIcon} label="Likes" count={likes} />
              <Action icon={shareIcon} label="Share" />
            </ActionGroup>
            <Action icon={ellipsisIcon} label="More" />
          </Actions>
        </Body>
      </Content>
    </Article>
  );
}

Post.propTypes = {
  location: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
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
