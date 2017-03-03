import React from "react";
import "whatwg-fetch";
import { MIN_PASSWORD_LEN, encodeQueryString, errClassName } from "./lib";
import { hashHistory, Link } from "react-router";

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: "", isValid: null },
      password: { value: "", isValid: null },
      passwordConfirm: { value: "", isValid: null },
      serverError: null
    };
  }

  handleChange(e) {
    let state = this.state;
    switch (e.target.name) {
      case "signup-email":
        state.email = { value: e.target.value, isValid: null }
        break;
      case "signup-password":
        state.password = { value: e.target.value, isValid: null }
        break;
      case "signup-password-confirm":
        state.passwordConfirm = { value: e.target.value, isValid: null }
        break;
      default:
        throw new Error(`unknown element name ${e.target.name}`);
    }
    this.setState(state);
  }

  validEmail() {
    return /^.+@.+\..+$/.test(this.state.email.value);
  }

  validPassword() {
    return this.state.password.value.length >= MIN_PASSWORD_LEN;
  }

  validPasswordConfirm() {
    return this.validPassword() &&
      this.state.password.value === this.state.passwordConfirm.value;
  }

  validateEmail() {
    this.setState({ email: {
      value: this.state.email.value,
      isValid: this.validEmail()
    } });
  }

  validatePassword() {
    this.setState({ password: {
      value: this.state.password.value,
      isValid: this.validPassword()
    } });
  }

  validatePasswordConfirm() {
    this.setState({ passwordConfirm: {
      value: this.state.passwordConfirm.value,
      isValid: this.validPasswordConfirm()
    } });
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
      <div>
        <form className="alt-signup" onSubmit={e => this.handleSubmit(e)}>
          <fieldset>
            <legend className="usa-sr-only"><abbr>CA</abbr>lerts sign up form.</legend>
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
                onChange={e => this.handleChange(e)}
                onBlur={() => this.validateEmail()}
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
                onChange={e => this.handleChange(e)}
                onBlur={() => this.validatePassword()}
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
                onChange={e => this.handleChange(e)}
                onBlur={() => this.validatePasswordConfirm()}
              />
            </div>
            <input type="submit" className="usa-button usa-button-big usa-button-primary" value="Sign up" />
          </fieldset>
        </form>
      </div>
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
