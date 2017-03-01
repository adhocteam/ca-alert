import React from "react";
import { Link } from "react-router";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";

export default React.createClass({
  render() {
    return (
      <div>
        <section className="usa-hero calerts">
          <div className="usa-grid">
            <div className="usa-width-one-half">
              <h2>
                <span className="usa-hero-callout-alt">Sign up for alerts in your neighborhood</span>
                {" "}
              </h2>
              <p className="secondary-message">Keep track of emergencies where you and your loved ones live, work and play. </p>
              <h3>What’s happening right now?</h3>
              <a className="usa-button usa-button-big usa-button-outline" href="#">
                See current alerts
              </a>

            </div>

            <div className="usa-width-one-half">
              <form className="alt-signup">

                <label>Email address</label>
                  <input type="email" />

                <label>Password</label>
                  <input type="password" />

                  <label>Confirm password</label>
                    <input type="password" />


              <a
                className="usa-button usa-button-big usa-button-primary"
                href="#/account/signup"
              >
                Sign up
              </a>

              </form>

            </div>

          </div>
        </section>

      </div>
    );
  }
});
