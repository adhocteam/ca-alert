import React from "react";
import { Link } from "react-router";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";

export default React.createClass({
  render() {
    return (
      <div>
        <section className="usa-hero">
          <div className="usa-grid">
            <div className="usa-width-one-half">
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

            <div className="usa-width-one-half">
              Sign up form.
            </div>

          </div>
        </section>

      </div>
    );
  }
});
