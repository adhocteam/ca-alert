import React from "react";
import { isLoggedIn, loggedInUser } from "./session";
import SessionStore from "./session";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: loggedInUser() };
  }

  componentDidMount() {
    SessionStore.addListener('nav', this.update.bind(this));
  }

  componentWillUnmount() {
    SessionStore.removeListener('nav');
  }

  update() {
    this.setState({ user: loggedInUser() });
  }

  render() {
    if (this.state.user === null) {
      return (
        <a className="usa-button usa-button-outline" href="#/account/signin">
          Sign in
        </a>
      );
    } else {
      let user = this.state.user;
      return (
        <ul className="usa-unstyled-list usa-nav-secondary-links">

          <li>
            <a href="#/dashboard">{user.name ? user.name : user.email}</a>
          </li>
          <li className="mobile-only">
            <a href="#/dashboard/places">Places</a>
          </li>
          <li className="mobile-only">
            <a href="#/account/communication">Communication preferences</a>
          </li>
          <li className="mobile-only">
            <a href="#/dashboard/alerts">Previous alerts</a>
          </li>
          <li>
            <a href="#/account/signout">Sign out</a>
          </li>
        </ul>
      );
    }
  }
}
