import React from "react";
import { Link } from "react-router";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";

export default React.createClass({
  render() {
    return (
      <div>
        <section className="usa-hero">
          <div className="usa-grid">
            <div className="usa-hero-callout usa-section-dark">
              <h2>
                <span className="usa-hero-callout-alt">Hero callout:</span>
                {" "}Call attention to a current priority
              </h2>
              <a className="usa-hero-link" href="#">
                Link to more about that priority
              </a>
              <a
                className="usa-button usa-button-big usa-button-secondary"
                href="#/account/signup"
              >
                Sign up
              </a>
            </div>
          </div>
        </section>
        <section className="usa-grid usa-section">
          <div className="usa-width-one-third">
            <h2>A tagline highlights your approach.</h2>
          </div>
          <div className="usa-width-two-thirds">
            <p>
              The tagline should inspire confidence and interest, focusing on the value that your overall approach offers to your audience. Use a heading typeface and keep your tagline to just a few words, and don’t confuse or mystify.
            </p>
            <p>
              Use the right side of the grid to explain the tagline a bit more. What are your goals? How do you do your work? Write in the present tense, and stay brief here. People who are interested can find details on internal pages.
            </p>
          </div>
        </section>
        <section className="usa-section usa-section-dark usa-graphic_list">
          <div className="usa-grid usa-graphic_list-row">
            <div className="usa-width-one-half usa-media_block">
              <img
                className="usa-media_block-img"
                src="./node_modules/uswds/dist/img/circle-124.png"
                alt="Alt text"
              />
              <div className="usa-media_block-body">
                <h3>Graphic headings can vary.</h3>
                <p>
                  Graphic headings can be used a few different ways, depending on what your landing page is for. Highlight your values, specific program areas, or results.
                </p>
              </div>
            </div>
            <div className="usa-width-one-half usa-media_block">
              <img
                className="usa-media_block-img"
                src="./node_modules/uswds/dist/img/circle-124.png"
                alt="Alt text"
              />
              <div className="usa-media_block-body">
                <h3>Stick to 6 or fewer words.</h3>
                <p>
                  Keep body text to about 30. They can be shorter, but try to be somewhat balanced across all four. It creates a clean appearance with good spacing.
                </p>
              </div>
            </div>
          </div>
          <div className="usa-grid usa-graphic_list-row">
            <div className="usa-width-one-half usa-media_block">
              <img
                className="usa-media_block-img"
                src="./node_modules/uswds/dist/img/circle-124.png"
                alt="Alt text"
              />
              <div className="usa-media_block-body">
                <h3>Never highlight anything without a goal.</h3>
                <p>
                  For anything you want to highlight here, understand what your users know now, and what activity or impression you want from them after they see it.
                </p>
              </div>
            </div>
            <div className="usa-width-one-half usa-media_block">
              <img
                className="usa-media_block-img"
                src="./node_modules/uswds/dist/img/circle-124.png"
                alt="Alt text"
              />
              <div className="usa-media_block-body">
                <h3>Could also have 2 or 6.</h3>
                <p>
                  In addition to your goal, find out your users’ goals. What do they want to know or do that supports your mission? Use these headings to show those.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="usa-section">
          <div className="usa-grid">
            <h2>Section heading</h2>
            <p className="usa-font-lead">
              Everything up to this point should help people understand your agency or project: who you are, your goal or mission, and how you approach it. Use this section to encourage them to act. Describe why they should get in touch here, and use an active verb on the button below. “Get in touch,” “Learn more,” and so on.
            </p>
            <a className="usa-button usa-button-big" href="#">Call to action</a>
          </div>
        </section>
      </div>
    );
  }
});
