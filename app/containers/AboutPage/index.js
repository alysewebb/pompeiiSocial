/**
 * AboutPage
 *
 * The site story. On desktop it keeps the homepage title and snake,
 * and the column is as wide as the feed and trending column together.
 * On smaller screens it is only as wide as the feed.
 */

import React, { useCallback, useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet';

import history from 'utils/history';
import snakeDesktopIcon from '../../images/feed/snake-desktop.svg';
import arrowLeftIcon from '../../images/about/arrow-left.svg';
import columnIcon from '../../images/about/column.svg';
import volcanoIcon from '../../images/about/volcano.svg';
import snakeIcon from '../../images/about/snake.svg';
import penIcon from '../../images/about/pen.svg';
import '../HomePage/index.css';
import './index.css';

const atlanticUrl =
  'https://www.theatlantic.com/technology/archive/2016/03/adrienne-was-here/475719/';
const graffitiUrl = 'https://ancientgraffiti.org/Graffiti';
const portfolioUrl = 'https://alysewebb.com';

export default function AboutPage() {
  const goHome = useCallback(() => {
    history.push('/');
  }, []);

  useLayoutEffect(() => {
    if (history.location.hash !== '#get-in-touch') {
      return;
    }

    const section = document.getElementById('get-in-touch');
    const column = document.querySelector('.about-body');
    if (!section || !column) {
      return;
    }

    const header = document.querySelector('.about-header');
    const headerCoversContent =
      header && getComputedStyle(header).position === 'sticky';
    const visibleHeight = headerCoversContent
      ? window.innerHeight - header.offsetHeight
      : column.clientHeight;
    const shortfall = visibleHeight - section.offsetHeight;

    if (shortfall > 0) {
      column.style.paddingBottom = `${shortfall}px`;
    }

    section.scrollIntoView();
  }, []);

  return (
    <main className="screen">
      <Helmet titleTemplate="%s" defaultTitle="About">
        <title>About</title>
      </Helmet>
      <aside className="rail">
        <img src={snakeDesktopIcon} alt="" />
        <h1 className="brand-title">Conversations from Pompeii</h1>
      </aside>
      <div className="phone about-column">
        <header className="about-header">
          <button
            className="about-back"
            type="button"
            aria-label="Back"
            onClick={goHome}
          >
            <img src={arrowLeftIcon} alt="" />
          </button>
          <h2 className="about-heading">About</h2>
        </header>
        <div className="about-body">
          <section className="about-section about-section--trail">
            <div className="about-icon">
              <img src={columnIcon} alt="" />
            </div>
            <div className="about-info">
              <h3>What is this site?</h3>
              <div className="about-copy">
                <p>
                  Hi, I’m Alyse - a UX/Product Designer with a keen interest in
                  history and archaeology.
                </p>
                <p>
                  {[
                    'I noticed articles comparing the graffiti of ancient Pompeii and Herculaneum to modern social media (',
                    <a
                      key="atlantic"
                      href={atlanticUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {`like this one from the Atlantic`}
                    </a>,
                    '), and wondered - what if I put them in that format?',
                  ]}
                </p>
                <p>
                  {[
                    'The data comes from the amazing digital repository of that grafitti freely available at ',
                    <a
                      key="agp"
                      href={graffitiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      The Ancient Graffiti Project
                    </a>,
                    '. All credit for digitization of the graffiti and the json from which I build my feed goes to the The Ancient Graffiti Project team.',
                  ]}
                </p>
              </div>
            </div>
          </section>
          <section className="about-section about-section--trail">
            <div className="about-icon">
              <img src={volcanoIcon} alt="" />
            </div>
            <div className="about-info">
              <h3>Why do we have all this graffiti?</h3>
              <div className="about-copy">
                <p>
                  Pompeii and Herculaneum were destroyed in the volcanic
                  eruption of Mount Vesuvius in 79AD. This ancient tragedy
                  preserved much of the archaeological material in a more
                  ‘snapshot in time’ way that almost any other site. One aspect
                  of that is the graffiti.
                </p>
                <p>
                  Compared to more formal inscriptions, graffiti is less likely
                  to survive, and is a window into the more spontaneous thoughts
                  of the everyday citizen of these ancient roman cities.
                </p>
              </div>
            </div>
          </section>
          <section className="about-section">
            <div className="about-icon">
              <img src={snakeIcon} alt="" />
            </div>
            <div className="about-info">
              <h3>Why the snake?</h3>
              <div className="about-copy">
                <p>
                  Snakes were considered guardian spirits of the home, and
                  commonly depicted in household shrines throughout Pompeii. It
                  seemed like an appropriate choice for a long feed of posts.
                </p>
              </div>
            </div>
          </section>
          <section className="about-section" id="get-in-touch">
            <div className="about-icon">
              <img src={penIcon} alt="" />
            </div>
            <div className="about-info">
              <h3>Get in touch</h3>
              <div className="about-copy">
                <p>
                  If you’d like to chat about this project or another, feel free
                  to reach out via my portfolio at{' '}
                  <a
                    href={portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    alysewebb.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
