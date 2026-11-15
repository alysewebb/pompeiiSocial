/**
 * HomePage
 *
 * The main feed: a fixed header and a scrollable list of posts.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Post from 'components/Post';
import menuIcon from '../../images/feed/menu.svg';
import snakeIcon from '../../images/feed/snake.svg';
import searchIcon from '../../images/feed/search.svg';
import hashIcon from '../../images/feed/hash.svg';
import composeIcon from '../../images/feed/compose.svg';
import posts from './posts';

const Screen = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
`;

const Phone = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 402px;
  height: 100%;
  max-height: 932px;
  background-color: #fff;
`;

const Header = styled.header`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  background-color: #fff;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 60px;
  padding: 0 16px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const SearchButton = styled(IconButton)`
  justify-self: end;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #e3e8ec;
`;

const Tab = styled.button`
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: normal;
  color: #101820;
`;

const ActiveIndicator = styled.span`
  position: absolute;
  bottom: 0;
  left: calc(50% + 0.5px);
  width: 79px;
  height: 3px;
  border-radius: 3px;
  background-color: #900000;
  transform: translateX(-50%);
`;

const Feed = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const Compose = styled.button`
  position: absolute;
  right: 21px;
  bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background-color: #900000;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.14);
  cursor: pointer;
`;

export default function HomePage() {
  return (
    <Screen>
      <Helmet titleTemplate="%s" defaultTitle="Discover">
        <title>Discover</title>
      </Helmet>
      <Phone>
        <Header>
          <Controls>
            <IconButton type="button" aria-label="Menu">
              <img src={menuIcon} alt="" />
            </IconButton>
            <img src={snakeIcon} alt="" />
            <SearchButton type="button" aria-label="Search">
              <img src={searchIcon} alt="" />
            </SearchButton>
          </Controls>
          <Tabs role="tablist" aria-label="Feeds">
            <Tab type="button" role="tab" aria-selected="true">
              Discover
              <ActiveIndicator />
            </Tab>
            <Tab
              type="button"
              role="tab"
              aria-selected="false"
              aria-label="Feeds"
            >
              <img src={hashIcon} alt="" />
            </Tab>
          </Tabs>
        </Header>
        <Feed>
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
        </Feed>
        <Compose type="button" aria-label="Compose post">
          <img src={composeIcon} alt="" />
        </Compose>
      </Phone>
    </Screen>
  );
}
