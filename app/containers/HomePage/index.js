/**
 * HomePage
 *
 * The first screen of the app: an ASCII narwhal, and nothing else.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const NARWHAL = `
                         \\
                          \\
                           \\
                            \\
                             \\.
                              \\\\
                               \\\\
                                \\\\
                                 \\\\_______________
                                /                 \\
                               /                   \\
                              /    .---------.      \\
                             |    /           \\      |
                             |   |      o      |     |
                             |    \\           /      |
                              \\    '---------'      /
                               \\                   /
                                \\                 /
                                 '---------------'
                                        ||
                                        ||
                                   .----'  '----.
                                   '------------'
`.replace(/^\n/, '');

const Stage = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111111;
  color: #f4f1ea;
`;

const Art = styled.pre`
  margin: 0;
  font-family: Consolas, 'Courier New', Courier, monospace;
  font-size: 15px;
  line-height: 1.15;
`;

export default function HomePage() {
  return (
    <Stage>
      <Helmet titleTemplate="%s" defaultTitle="Narwhal">
        <title>Narwhal</title>
      </Helmet>
      <Art role="img" aria-label="An ASCII art narwhal">
        {NARWHAL}
      </Art>
    </Stage>
  );
}
