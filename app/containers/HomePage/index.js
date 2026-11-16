/**
 * HomePage
 *
 * The main feed: a fixed header and a scrollable list of posts.
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import Post from 'components/Post';
import menuIcon from '../../images/feed/menu.svg';
import snakeIcon from '../../images/feed/snake.svg';
import searchIcon from '../../images/feed/search.svg';
import hashIcon from '../../images/feed/hash.svg';
import composeIcon from '../../images/feed/compose.svg';
import posts from './posts';
import './index.css';

export default function HomePage() {
  return (
    <main className="screen">
      <Helmet titleTemplate="%s" defaultTitle="Discover">
        <title>Discover</title>
      </Helmet>
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
        <button className="compose" type="button" aria-label="Compose post">
          <img src={composeIcon} alt="" />
        </button>
      </div>
    </main>
  );
}
