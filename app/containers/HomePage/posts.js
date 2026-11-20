import graffiti from '../../graffiti.json';
import avatarMan1 from '../../images/feed/avatars/Avatar · Man 1.svg';
import avatarMan2 from '../../images/feed/avatars/Avatar - Man 2.svg';
import avatarMan3 from '../../images/feed/avatars/Avatar - Man 3.svg';
import avatarMan4 from '../../images/feed/avatars/Avatar - Man 4.svg';
import avatarMan5 from '../../images/feed/avatars/Avatar - Man 5.svg';
import avatarSoldier from '../../images/feed/avatars/Avatar - Soldier.svg';
import avatarWoman1 from '../../images/feed/avatars/Avatar - Woman 1.svg';
import avatarWoman2 from '../../images/feed/avatars/Avatar - Woman 2.svg';

const avatars = [
  avatarMan1,
  avatarMan2,
  avatarMan3,
  avatarMan4,
  avatarMan5,
  avatarSoldier,
  avatarWoman1,
  avatarWoman2,
];

function randomAvatar() {
  return avatars[Math.floor(Math.random() * avatars.length)];
}

const commentCounts = [12, 28, 6, 14];
const likeCounts = [186, 642, 93, 128];

function isDrawingCaption(caption) {
  return typeof caption === 'string' && /drawing/i.test(caption);
}

function englishDescription(item) {
  if (typeof item.descriptionInEnglish === 'string') {
    return item.descriptionInEnglish;
  }

  const nested = item.figuralInfo && item.figuralInfo.descriptionInEnglish;
  return typeof nested === 'string' ? nested : '';
}

function firstImage(item) {
  const described = englishDescription(item) !== '';
  if (
    (!isDrawingCaption(item.caption) && !described) ||
    !item.photos ||
    !item.photos.length
  ) {
    return null;
  }

  const photo = item.photos[0];
  return photo.imagePath || photo.thumbPath || null;
}

const posts = graffiti
  .filter(
    item =>
      item.contentTranslation ||
      isDrawingCaption(item.caption) ||
      englishDescription(item),
  )
  .map((item, index) => ({
    id: item.agpId || index,
    graffiti: item,
    image: firstImage(item),
    imageAlt: item.caption || englishDescription(item),
    comments: commentCounts[index % commentCounts.length],
    likes: likeCounts[index % likeCounts.length],
    avatar: randomAvatar(),
  }));

export default posts;
