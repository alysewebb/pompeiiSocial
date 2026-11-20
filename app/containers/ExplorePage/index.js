/**
 * ExplorePage
 *
 * Mobile search. An empty state until a keyword or location is entered,
 * then the same posts as the feed, filtered to that query.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Post from 'components/Post';
import menuIcon from '../../images/feed/menu.svg';
import searchIcon from '../../images/feed/explore-search.svg';
import searchMark from '../../images/feed/explore-mark.svg';
import posts from '../HomePage/posts';
import { postMatchesQuery } from '../HomePage/search';
import './index.css';

export function SearchField({ value, onChange }) {
  return (
    <label className="explore-search">
      <img src={searchIcon} alt="" />
      <input
        className="explore-search-input"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    </label>
  );
}

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function SearchEmpty({ message }) {
  return (
    <div className="explore-empty">
      <img src={searchMark} alt="" />
      <p>{message}</p>
    </div>
  );
}

SearchEmpty.propTypes = {
  message: PropTypes.string.isRequired,
};

export default function ExplorePage({ menuOpen, onOpenMenu, language }) {
  const [query, setQuery] = useState('');
  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? posts.filter(post => postMatchesQuery(post, trimmed))
    : null;

  return (
    <>
      <header className="explore-header">
        <button
          className="icon-button"
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={onOpenMenu}
        >
          <img src={menuIcon} alt="" />
        </button>
        <h1 className="explore-title">Explore</h1>
      </header>
      <div className="explore-search-row">
        <SearchField value={query} onChange={setQuery} />
      </div>
      {results && results.length > 0 ? (
        <div className="feed">
          {results.map(post => (
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
          ))}
        </div>
      ) : (
        <SearchEmpty
          message={
            results
              ? 'No posts match that search'
              : 'Search for posts based on keywords and locations'
          }
        />
      )}
    </>
  );
}

ExplorePage.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  onOpenMenu: PropTypes.func.isRequired,
  language: PropTypes.oneOf(['English', 'Latin']).isRequired,
};
