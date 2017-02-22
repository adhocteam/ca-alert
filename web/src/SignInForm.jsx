import React from "react";
import { MIN_PASSWORD_LEN, encodeQueryString, errClassName } from "./lib";
import { hashHistory, Link } from "react-router";
import { newLoginSession } from "./session";

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        isValid: null
      },
      password: {
        value: "",
        isValid: null
      },
      serverError: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    switch (e.target.name) {
      case "signin-email":
        this.state.email.value = e.target.value;
        break;
      case "signin-password":
        this.state.password.value = e.target.value;
        break;
    }
    this.setState(this.state);
  }

  handleBlur(e) {
    switch (e.target.name) {
      case "signin-email":
        this.state.email.isValid = /^.+@.+\..+$/.test(this.state.email.value);
        break;
      case "signin-password":
        this.state.password.isValid = this.state.password.value.length >=
          MIN_PASSWORD_LEN;
        break;
    }
    this.setState(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.serverError = null;
    this.setState(this.state);
    let qs = encodeQueryString([
      ["email", this.state.email.value],
      ["password", this.state.password.value]
    ]);
    let accessToken, client, expiry, uid;
    fetch(API_HOST + "/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: qs
    })
      .then(response => {
        if (response.status === 401) {
          this.state.serverError = "Incorrect email/password. Please try again";
          this.setState(this.state);
          throw new Error("HTTP 401 Unauthorized");
        } else if (response.status !== 200) {
          this.state.serverError = "There was an error! Please try again";
          this.setState(this.state);
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        } else {
          let headers = response.headers;
          accessToken = headers.get("access-token");
          client = headers.get("client");
          expiry = headers.get("expiry");
          uid = headers.get("uid");
          return response.json();
        }
      })
      .then(data => {
        newLoginSession(data.data, accessToken, client, expiry, uid);
        hashHistory.push("/dashboard");
      })
      .catch(error => {
        console.error("error with request: %o", error);
      });
  }

  formIsValid() {
    return this.state.email.isValid && this.state.password.isValid;
  }

  render() {
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
    let emailErrMsg;
    let passwordErrMsg;
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
    let button;
    if (this.formIsValid()) {
      button = <input type="submit" value="Sign in" />;
    } else {
      button = <input type="submit" disabled="disabled" value="Sign in" />;
    }
    return (
      <section className="usa-grid usa-section">
        <div className="usa-width-one-third">
          <h2>Sign in with an existing account and manage your alerts.</h2>
        </div>
        <div className="usa-width-two-thirds">
          <form className="usa-form" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend className="usa-drop_text">Sign in</legend>
              <span>
                Need an account?{" "}
                <Link to="/account/signup">Sign up instead</Link>
                .
              </span>
              {serverError}
              <div className={errClassName(this.state.email.isValid, "div")}>
                {emailErrMsg}
                <label
                  className={errClassName(this.state.email.isValid, "label")}
                  htmlFor="signin-email"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="signin-email"
                  name="signin-email"
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
                  htmlFor="signin-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="signin-password"
                  name="signin-password"
                  placeholder="minimum 8 characters"
                  className={errClassName(this.state.password.isValid, "input")}
                  value={this.state.password.value}
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
