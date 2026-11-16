import graffiti from '../../graffiti.json';
import backdropUpperLeft from '../../images/feed/backdrop-upper-left.png';
import backdropLowerRight from '../../images/feed/backdrop-lower-right.png';
import backdropUpperRight from '../../images/feed/backdrop-upper-right.png';
import backdropLowerLeft from '../../images/feed/backdrop-lower-left.png';
import avatarBun from '../../images/feed/avatar-bun.svg';
import avatarProfile from '../../images/feed/avatar-profile.svg';
import avatarVeil from '../../images/feed/avatar-veil.svg';
import avatarBeard from '../../images/feed/avatar-beard.svg';

const avatars = [
  {
    backdrop: backdropUpperLeft,
    silhouette: avatarBun,
    placement: 'bun',
  },
  {
    backdrop: backdropLowerRight,
    silhouette: avatarProfile,
    placement: 'profile',
  },
  {
    backdrop: backdropUpperRight,
    silhouette: avatarVeil,
    placement: 'veil',
  },
  {
    backdrop: backdropLowerLeft,
    silhouette: avatarBeard,
    placement: 'beard',
  },
];

const commentCounts = [12, 28, 6, 14];
const likeCounts = [186, 642, 93, 128];

const posts = graffiti
  .filter(item => item.contentTranslation)
  .map((item, index) => ({
    id: item.agpId || index,
    graffiti: item,
    comments: commentCounts[index % commentCounts.length],
    likes: likeCounts[index % likeCounts.length],
    avatar: avatars[index % avatars.length],
  }));

export default posts;
