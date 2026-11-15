import backdropUpperLeft from '../../images/feed/backdrop-upper-left.png';
import backdropLowerRight from '../../images/feed/backdrop-lower-right.png';
import backdropUpperRight from '../../images/feed/backdrop-upper-right.png';
import backdropLowerLeft from '../../images/feed/backdrop-lower-left.png';
import avatarBun from '../../images/feed/avatar-bun.svg';
import avatarProfile from '../../images/feed/avatar-profile.svg';
import avatarVeil from '../../images/feed/avatar-veil.svg';
import avatarBeard from '../../images/feed/avatar-beard.svg';
import coastalWalk from '../../images/feed/coastal-walk.png';

const location = 'Herculaneum, Cardo IV (V.1-9)';

const posts = [
  {
    id: 'coastal-walk',
    location,
    text: 'Took the long way home. Always take the long way home.',
    image: coastalWalk,
    imageAlt: 'Coastal walk',
    comments: 12,
    likes: 186,
    avatar: {
      backdrop: backdropUpperLeft,
      silhouette: avatarBun,
      placement: 'bun',
    },
  },
  {
    id: 'pottery',
    location,
    text:
      'A small reminder that you don’t have to turn every hobby into a side hustle. You can just be bad at pottery. It’s fine.',
    comments: 28,
    likes: 642,
    avatar: {
      backdrop: backdropLowerRight,
      silhouette: avatarProfile,
      placement: 'profile',
    },
  },
  {
    id: 'more-of-this',
    location,
    text: 'This is exactly why I’m here. More of this, please.',
    comments: 6,
    likes: 93,
    avatar: {
      backdrop: backdropUpperRight,
      silhouette: avatarVeil,
      placement: 'veil',
    },
  },
  {
    id: 'cat',
    location,
    text:
      'The cat has been asleep through three meetings and somehow still has the best work-life balance in this house.',
    comments: 14,
    likes: 128,
    avatar: {
      backdrop: backdropLowerLeft,
      silhouette: avatarBeard,
      placement: 'beard',
    },
  },
  {
    id: 'more-of-this-again',
    location,
    text: 'This is exactly why I’m here. More of this, please.',
    comments: 6,
    likes: 93,
    avatar: {
      backdrop: backdropUpperRight,
      silhouette: avatarVeil,
      placement: 'veil',
    },
  },
];

export default posts;
