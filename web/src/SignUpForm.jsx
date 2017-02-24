import React from "react";
import "whatwg-fetch";
import { MIN_PASSWORD_LEN, encodeQueryString, errClassName } from "./lib";
import { hashHistory, Link } from "react-router";

export class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: "", isValid: null },
      password: { value: "", isValid: null },
      passwordConfirm: { value: "", isValid: null },
      serverError: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let state = this.state;
    switch (e.target.name) {
      case "signup-email":
        state.email.value = e.target.value;
        break;
      case "signup-password":
        state.password.value = e.target.value;
        break;
      case "signup-password-confirm":
        state.passwordConfirm.value = e.target.value;
        break;
      default:
        throw new Error(`unknown element name ${e.target.name}`);
    }
    this.setState(state);
  }

  handleBlur(e) {
    let state = this.state;
    switch (e.target.name) {
      case "signup-email":
        state.email.isValid = /^.+@.+\..+$/.test(e.target.value);
        break;
      case "signup-password":
        state.password.isValid = e.target.value.length >= MIN_PASSWORD_LEN;
        break;
      case "signup-password-confirm":
        state.passwordConfirm.isValid = e.target.value ===
          state.password.value &&
          state.password.isValid;
        break;
    }
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    let qs = encodeQueryString([
      ["email", this.state.email.value],
      ["password", this.state.password.value],
      ["password_confirmation", this.state.passwordConfirm.value]
    ]);
    fetch(API_HOST + "/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: qs
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "error") {
          this.setState({ serverError: data.errors.full_messages.join("; ") });
        } else {
          // TODO(paulsmith): show "please verify" message
          hashHistory.push("/account/signup/verify");
        }
      })
      .catch(error => {
        console.error("request failed", error);
        this.setState({ serverError: "Please try again later." });
      });
  }

  formIsValid() {
    return this.state.email.isValid &&
      this.state.password.isValid &&
      this.state.passwordConfirm.isValid;
  }

  render() {
    let button = null;
    if (this.formIsValid()) {
      button = <input type="submit" value="Sign up" />;
    } else {
      button = <input type="submit" disabled="disabled" value="Sign up" />;
    }
    let emailErrMsg, passwordErrMsg, passwordConfirmErrMsg;
    if (
      this.state.email.isValid !== null && this.state.email.isValid === false
    ) {
      emailErrMsg = (
        <span className="usa-input-error-message" role="alert">
          Please supply a valid email address.
        </span>
      );
    }
    if (
      this.state.password.isValid !== null &&
        this.state.password.isValid === false
    ) {
      passwordErrMsg = (
        <span className="usa-input-error-message" role="alert">
          Please supply a password at least {MIN_PASSWORD_LEN} characters long.
        </span>
      );
    }
    if (
      this.state.passwordConfirm.isValid !== null &&
        this.state.passwordConfirm.isValid === false
    ) {
      passwordConfirmErrMsg = (
        <span className="usa-input-error-message" role="alert">
          Passwords must match.
        </span>
      );
    }
    let serverError;
    if (this.state.serverError !== null) {
      serverError = (
        <div className="usa-alert usa-alert-error" role="alert">
          <div className="usa-alert-body">
            <h3 className="usa-alert-heading">There was an error</h3>
            <p className="usa-alert-text">
              {this.state.serverError}
            </p>
          </div>
        </div>
      );
    }
    return (
      <section className="usa-grid usa-section">
        <div className="usa-width-one-third">
          <h2>Sign up with a new account and get notified of alerts.</h2>
        </div>
        <div className="usa-width-two-thirds">
          <form className="usa-form" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend className="usa-drop_text">Sign up</legend>
              <span>
                Have an account?{" "}
                <Link to="/account/signin">Sign in instead</Link>
                .
              </span>
              {serverError}
              <div className={errClassName(this.state.email.isValid, "div")}>
                {emailErrMsg}
                <label
                  className={errClassName(this.state.email.isValid, "label")}
                  htmlFor="signup-email"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="signup-email"
                  className={errClassName(this.state.email.isValid, "input")}
                  placeholder="name@example.com"
                  value={this.state.email.value}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </div>
              <div className={errClassName(this.state.password.isValid, "div")}>
                {passwordErrMsg}
                <label
                  className={errClassName(this.state.password.isValid, "label")}
                  htmlFor="signup-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  name="signup-password"
                  placeholder="minimum 8 characters"
                  className={errClassName(this.state.password.isValid, "input")}
                  value={this.state.password.value}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </div>
              <div
                className={errClassName(
                  this.state.passwordConfirm.isValid,
                  "div"
                )}
              >
                {passwordConfirmErrMsg}
                <label
                  className={errClassName(
                    this.state.passwordConfirm.isValid,
                    "label"
                  )}
                  htmlFor="signup-password-confirm"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="signup-password-confirm"
                  name="signup-password-confirm"
                  className={errClassName(
                    this.state.passwordConfirm.isValid,
                    "input"
                  )}
                  value={this.state.passwordConfirm.value}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </div>
              {button}
            </fieldset>
          </form>
        </div>
      </section>
    );
  }
}

export const VerifySignUp = React.createClass({
  render() {
    return (
      <section className="usa-grid usa-section">
        <h3>Please verify your email address</h3>
        <p>
          We sent you an email with a verification link in it. Please check your inbox and click on that link to finish verifying your email address.
        </p>
      </section>
    );
  }
});
