import React from "react";
import ReactDOM from "react-dom";

class SignUpForm extends React.Component {
  render() {
    return (
      <section className="usa-grid usa-section">
        <div className="usa-width-one-third" id="app-test">
          <h2>Sign up with a new account and get notified of alerts.</h2>
        </div>
        <div className="usa-width-two-thirds">
          <form className="usa-form">
            <fieldset>
              <legend className="usa-drop_text">Sign up</legend>
              <span>Have an account? <a href="#">Sign in instead</a>.</span>
              <label for="signup-email">Email address</label>
              <input
                type="email"
                pattern="^.+@.+\..+$"
                id="signup-email"
                name="signup-email"
                placeholder="name@example.com"
              />
              <label for="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                name="signup-password"
                placeholder="minimum 8 characters"
              />
              <label for="signup-password-confirm">Confirm password</label>
              <input
                type="password"
                id="signup-password-confirm"
                name="signup-confirm-password"
              />
              <button type="submit">Sign up</button>
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
}

ReactDOM.render(<SignUpForm />, document.getElementById("app"));
