import { encodeQueryString } from "./lib";

const MIN_PASSWORD_LEN = 8;
const AUTH_RESOURCE = "http://localhost:3000/auth"; // TODO(paulsmith): parameterize for production

class SignUpForm extends React.Component {
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
    fetch(AUTH_RESOURCE, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: qs
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "error") {
          this.state.serverError = data.errors.full_messages.join("; ");
          this.setState(this.state);
        } else {
          window.location = "/dashboard.html";
        }
      })
      .catch(error => {
        console.error("request failed", error);
        this.state.serverError("Please try again later.");
        this.setState(this.state);
      });
  }

  formIsValid() {
    return this.state.email.isValid &&
      this.state.password.isValid &&
      this.state.passwordConfirm.isValid;
  }

  errClassName(isValid, which) {
    let success = "";
    let error = "";
    switch (which) {
      case "div":
        success = "";
        error = "usa-input-error";
        break;
      case "label":
        success = "usa-input-success-label";
        error = "usa-input-error-label";
        break;
      case "input":
        success = "usa-input-success";
        error = "";
        break;
    }
    return isValid === null ? "" : isValid === true ? success : error;
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
        <div className="usa-width-one-third" id="app-test">
          <h2>Sign up with a new account and get notified of alerts.</h2>
        </div>
        <div className="usa-width-two-thirds">
          <form className="usa-form" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend className="usa-drop_text">Sign up</legend>
              <span>Have an account? <a href="#">Sign in instead</a>.</span>
              {serverError}
              <div
                className={this.errClassName(this.state.email.isValid, "div")}
              >
                {emailErrMsg}
                <label
                  className={this.errClassName(
                    this.state.email.isValid,
                    "label"
                  )}
                  htmlFor="signup-email"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="signup-email"
                  name="signup-email"
                  className={this.errClassName(
                    this.state.email.isValid,
                    "input"
                  )}
                  placeholder="name@example.com"
                  value={this.state.email.value}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </div>
              <div
                className={this.errClassName(
                  this.state.password.isValid,
                  "div"
                )}
              >
                {passwordErrMsg}
                <label
                  className={this.errClassName(
                    this.state.password.isValid,
                    "label"
                  )}
                  htmlFor="signup-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  name="signup-password"
                  placeholder="minimum 8 characters"
                  className={this.errClassName(
                    this.state.password.isValid,
                    "input"
                  )}
                  value={this.state.password.value}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
              </div>
              <div
                className={this.errClassName(
                  this.state.passwordConfirm.isValid,
                  "div"
                )}
              >
                {passwordConfirmErrMsg}
                <label
                  className={this.errClassName(
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
                  className={this.errClassName(
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

ReactDOM.render(<SignUpForm />, document.getElementById("app"));
