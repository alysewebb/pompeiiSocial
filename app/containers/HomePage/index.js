/**
 * HomePage
 *
 * The main feed: a fixed header and a scrollable list of posts.
 * At 1301px and up, the logo moves into a left column and search
 * plus trending tags appear on the right.
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import NewPostDialog from 'components/NewPostDialog';
import Post from 'components/Post';
import menuIcon from '../../images/feed/menu.svg';
import snakeIcon from '../../images/feed/snake.svg';
import snakeDesktopIcon from '../../images/feed/snake-desktop.svg';
import searchIcon from '../../images/feed/search.svg';
import searchFieldIcon from '../../images/feed/search-field.svg';
import hashIcon from '../../images/feed/hash.svg';
import globeIcon from '../../images/feed/globe.svg';
import expandIcon from '../../images/feed/expand.svg';
import selectedIcon from '../../images/feed/selected.svg';
import squarePenIcon from '../../images/feed/square-pen.svg';
import posts from './posts';
import './index.css';

const languages = ['English', 'Latin'];
const tags = ['Gladiators', 'Fast Food', 'Senators', 'Weather', 'Greetings'];

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
  const [languageOpen, setLanguageOpen] = useState(true);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const closeNewPost = useCallback(() => setNewPostOpen(false), []);
  const openNewPost = useCallback(() => setNewPostOpen(true), []);

  return (
    <main className="screen">
      <Helmet titleTemplate="%s" defaultTitle="Discover">
        <title>Discover</title>
      </Helmet>
      <aside className="rail">
        <img src={snakeDesktopIcon} alt="" />
        <h1 className="brand-title">Conversations from Pompeii</h1>
        <div className="language">
          <button
            className="language-trigger"
            type="button"
            aria-expanded={languageOpen}
            aria-haspopup="listbox"
            onClick={() => setLanguageOpen(open => !open)}
          >
            <img className="language-globe" src={globeIcon} alt="" />
            <span className="language-label">{language}</span>
            <img className="language-expand" src={expandIcon} alt="" />
          </button>
          {languageOpen && (
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
                    onClick={() => setLanguage(name)}
                  >
                    {name}
                    {name === language && <img src={selectedIcon} alt="" />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <NewPostButton onClick={openNewPost} />
      </aside>
      <div className="phone">
        <header className="header">
          <div className="controls">
            <button className="icon-button" type="button" aria-label="Menu">
              <img src={menuIcon} alt="" />
            </button>
            <img src={snakeIcon} alt="" />
            <button
              className="icon-button icon-button--end"
              type="button"
              aria-label="Search"
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
        <div className="feed">
          {posts.map(post => (
            <Post
              key={post.id}
              location={post.location}
              text={post.text}
              image={post.image}
              imageAlt={post.imageAlt}
              comments={post.comments}
              likes={post.likes}
              avatar={post.avatar}
            />
          ))}
        </div>
        <NewPostButton fab onClick={openNewPost} />
      </div>
      <aside className="sidebar">
        <label className="search">
          <img src={searchFieldIcon} alt="" />
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </label>
        <h2 className="trending-title">Trending</h2>
        <div className="tags">
          {tags.map(tag => (
            <button className="tag" key={tag} type="button">
              {tag}
            </button>
          ))}
        </div>
        <div className="sidebar-divider" />
        <p className="sidebar-links">About&nbsp;&nbsp;·&nbsp;&nbsp;Contact</p>
      </aside>
      {newPostOpen && <NewPostDialog onClose={closeNewPost} />}
    </main>
  );
}
