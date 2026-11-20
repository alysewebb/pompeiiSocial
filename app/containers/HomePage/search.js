function drawingTagNames(post) {
  const drawingTags =
    post.graffiti.figuralInfo && post.graffiti.figuralInfo.drawingTags;

  if (!Array.isArray(drawingTags)) {
    return [];
  }

  return drawingTags
    .map(tag => (tag && typeof tag.name === 'string' ? tag.name : ''))
    .filter(Boolean);
}

function searchableText(post) {
  const { graffiti } = post;
  const property = graffiti.property || {};
  const city =
    property.insula && property.insula.city && property.insula.city.name;
  const street =
    graffiti.segment &&
    graffiti.segment.street &&
    graffiti.segment.street.streetName;
  const figural = graffiti.figuralInfo || {};

  return [
    graffiti.contentTranslation,
    graffiti.content,
    graffiti.caption,
    graffiti.descriptionInEnglish,
    graffiti.descriptionInLatin,
    figural.descriptionInEnglish,
    figural.descriptionInLatin,
    property.englishPropertyName,
    property.propertyName,
    city,
    street,
    post.imageAlt,
    ...drawingTagNames(post),
  ]
    .filter(value => typeof value === 'string')
    .join('\n')
    .toLowerCase();
}

export function postMatchesQuery(post, query) {
  return searchableText(post).includes(query);
}
