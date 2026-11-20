/**
 * HomePage
 *
 * The main feed: a fixed header and a scrollable list of posts.
 * At 1301px and up, the logo moves into a left column and search
 * plus trending tags appear on the right.
 */

import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import NewPostDialog from 'components/NewPostDialog';
import Post from 'components/Post';
import ExplorePage, { SearchEmpty, SearchField } from 'containers/ExplorePage';
import history from 'utils/history';
import menuIcon from '../../images/feed/menu.svg';
import snakeIcon from '../../images/feed/snake.svg';
import snakeDesktopIcon from '../../images/feed/snake-desktop.svg';
import searchIcon from '../../images/feed/search.svg';
import hashIcon from '../../images/feed/hash.svg';
import globeIcon from '../../images/feed/globe.svg';
import expandIcon from '../../images/feed/expand.svg';
import selectedIcon from '../../images/feed/selected.svg';
import squarePenIcon from '../../images/feed/square-pen.svg';
import homeIcon from '../../images/feed/home.svg';
import posts from './posts';
import { postMatchesQuery } from './search';
import './index.css';

const languages = ['English', 'Latin'];

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

function propertyName(post) {
  const name = post.graffiti.property && post.graffiti.property.propertyName;
  return typeof name === 'string' ? name : '';
}

function byCount(counts) {
  return [...counts.keys()].sort(
    (a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b),
  );
}

const hiddenProperties = new Set(['Not found']);

function trendingTags(items) {
  const drawingCounts = new Map();
  const propertyCounts = new Map();

  items.forEach(post => {
    drawingTagNames(post).forEach(name => {
      if (name === 'Other') {
        return;
      }

      drawingCounts.set(name, (drawingCounts.get(name) || 0) + 1);
    });

    const place = propertyName(post);
    if (place && !hiddenProperties.has(place)) {
      propertyCounts.set(place, (propertyCounts.get(place) || 0) + 1);
    }
  });

  return [
    ...byCount(drawingCounts)
      .filter(label => drawingCounts.get(label) >= 8)
      .map(label => ({ label, kind: 'drawing' })),
    ...byCount(propertyCounts)
      .filter(label => propertyCounts.get(label) >= 10)
      .map(label => ({ label, kind: 'property' })),
  ];
}

function postText(post) {
  return typeof post.graffiti.contentTranslation === 'string'
    ? post.graffiti.contentTranslation
    : '';
}

function isGreeting(post) {
  return /\b(Greetings?|Hello)\b/i.test(postText(post));
}

function isFarewell(post) {
  return /\b(Farewell|Goodbye)\b/i.test(postText(post));
}

function postMatchesTag(post, tag) {
  if (tag.kind === 'greeting') {
    return isGreeting(post);
  }

  if (tag.kind === 'farewell') {
    return isFarewell(post);
  }

  if (tag.kind === 'drawing') {
    return drawingTagNames(post).includes(tag.label);
  }

  return propertyName(post) === tag.label;
}

const tags = [
  { label: 'Greetings', kind: 'greeting' },
  { label: 'Farewells', kind: 'farewell' },
  ...trendingTags(posts),
];

function LanguageSelect({ language, open, onToggle, onSelect }) {
  return (
    <div className="language">
      <button
        className="language-trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={onToggle}
      >
        <img className="language-globe" src={globeIcon} alt="" />
        <span className="language-label">{language}</span>
        <img className="language-expand" src={expandIcon} alt="" />
      </button>
      {open && (
        <ul className="language-menu" role="listbox" aria-label="Language">
          {languages.map(name => (
            <li key={name}>
              <button
                className={
                  name === language
                    ? 'language-option language-option--selected'
                    : 'language-option'
                }
                type="button"
                role="option"
                aria-selected={name === language}
                onClick={() => onSelect(name)}
              >
                {name}
                {name === language && <img src={selectedIcon} alt="" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

LanguageSelect.propTypes = {
  language: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function NewPostButton({ fab, onClick }) {
  return (
    <button
      className={fab ? 'new-post new-post--fab' : 'new-post'}
      type="button"
      onClick={onClick}
    >
      <img src={squarePenIcon} alt="" />
      <span className="new-post-label">New post</span>
    </button>
  );
}

NewPostButton.propTypes = {
  fab: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

NewPostButton.defaultProps = {
  fab: false,
};

export default function HomePage() {
  const [language, setLanguage] = useState('English');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const feedRef = useRef(null);
  const exploring = history.location.pathname === '/explore';
  const closeNewPost = useCallback(() => setNewPostOpen(false), []);
  const openNewPost = useCallback(() => setNewPostOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openExplore = useCallback(() => {
    setLanguageOpen(false);
    setMenuOpen(false);
    if (history.location.pathname !== '/explore') {
      history.push('/explore');
    }
  }, []);
  const goHome = useCallback(() => {
    setActiveTag(null);
    setLanguageOpen(false);
    setMenuOpen(false);
    if (history.location.pathname !== '/') {
      history.push('/');
      return;
    }

    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, []);
  const toggleLanguage = useCallback(
    () => setLanguageOpen(open => !open),
    [],
  );
  const selectLanguage = useCallback(name => {
    setLanguage(name);
    setLanguageOpen(false);
  }, []);
  const trimmedQuery = query.trim().toLowerCase();
  const visiblePosts = posts.filter(post => {
    if (trimmedQuery) {
      return postMatchesQuery(post, trimmedQuery);
    }

    return !activeTag || postMatchesTag(post, activeTag);
  });

  return (
    <main className="screen">
      <Helmet titleTemplate="%s" defaultTitle="Discover">
        <title>{exploring ? 'Explore' : 'Discover'}</title>
      </Helmet>
      <aside className="rail">
        <img src={snakeDesktopIcon} alt="" />
        <h1 className="brand-title">Conversations from Pompeii</h1>
        <LanguageSelect
          language={language}
          open={languageOpen}
          onToggle={toggleLanguage}
          onSelect={selectLanguage}
        />
        <NewPostButton onClick={openNewPost} />
      </aside>
      <div className="phone">
        {exploring ? (
          <ExplorePage
            menuOpen={menuOpen}
            onOpenMenu={() => setMenuOpen(true)}
            language={language}
          />
        ) : (
          <>
            <header className="header">
              <div className="controls">
                <button
                  className="icon-button"
                  type="button"
                  aria-label="Menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(true)}
                >
                  <img src={menuIcon} alt="" />
                </button>
                <img src={snakeIcon} alt="" />
                <button
                  className="icon-button icon-button--end"
                  type="button"
                  aria-label="Search"
                  onClick={openExplore}
                >
                  <img src={searchIcon} alt="" />
                </button>
              </div>
              <div className="tabs" role="tablist" aria-label="Feeds">
                <button
                  className="tab"
                  type="button"
                  role="tab"
                  aria-selected="true"
                >
                  Discover
                  <span className="active-indicator" />
                </button>
                <button
                  className="tab"
                  type="button"
                  role="tab"
                  aria-selected="false"
                  aria-label="Feeds"
                >
                  <img src={hashIcon} alt="" />
                </button>
              </div>
            </header>
            <div className="feed" ref={feedRef}>
              {trimmedQuery && visiblePosts.length === 0 ? (
                <SearchEmpty message="No posts match that search" />
              ) : (
                visiblePosts.map(post => (
                  <Post
                    key={post.id}
                    graffiti={post.graffiti}
                    image={post.image}
                    imageAlt={post.imageAlt}
                    comments={post.comments}
                    likes={post.likes}
                    avatar={post.avatar}
                    language={language}
                  />
                ))
              )}
            </div>
            <NewPostButton fab onClick={openNewPost} />
          </>
        )}
        <div className={menuOpen ? 'nav-drawer nav-drawer--open' : 'nav-drawer'}>
          <button
            className="nav-drawer__scrim"
            type="button"
            aria-label="Close menu"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
          />
          <div
            className="nav-drawer__panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            aria-hidden={!menuOpen}
          >
            <div className="nav-drawer__content">
              <button
                className="nav-drawer__logo"
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <img src={snakeDesktopIcon} alt="" />
              </button>
              <p className="brand-title">Conversations from Pompeii</p>
              <LanguageSelect
                language={language}
                open={languageOpen}
                onToggle={toggleLanguage}
                onSelect={selectLanguage}
              />
              <div className="nav-drawer__divider" />
              <button
                className="nav-drawer__item"
                type="button"
                onClick={goHome}
              >
                <img src={homeIcon} alt="" />
                <span>Home</span>
              </button>
              <button className="nav-drawer__item" type="button">
                <img src={hashIcon} alt="" />
                <span>Feeds</span>
              </button>
              <button
                className="nav-drawer__item"
                type="button"
                onClick={openExplore}
              >
                <img src={searchIcon} alt="" />
                <span>Explore</span>
              </button>
              <div className="nav-drawer__divider" />
              <p className="nav-drawer__meta">About</p>
              <p className="nav-drawer__meta">Contact</p>
            </div>
          </div>
        </div>
      </div>
      <aside className="sidebar">
        <SearchField value={query} onChange={setQuery} />
        <h2 className="trending-title">Trending</h2>
        <div className="tags">
          {tags.map(tag => {
            const selected =
              activeTag &&
              activeTag.kind === tag.kind &&
              activeTag.label === tag.label;

            return (
              <button
                className={selected ? 'tag tag--selected' : 'tag'}
                key={`${tag.kind}:${tag.label}`}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveTag(selected ? null : tag)}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
        <div className="sidebar-divider" />
        <p className="sidebar-links">About&nbsp;&nbsp;·&nbsp;&nbsp;Contact</p>
      </aside>
      {newPostOpen && <NewPostDialog onClose={closeNewPost} />}
    </main>
  );
}
