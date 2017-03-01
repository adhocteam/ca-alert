import React from "react";
import { isLoggedIn, loggedInUser } from "./session";

export default class Nav extends React.Component {
  render() {
    if (!isLoggedIn()) {
      return (
        <a className="usa-button usa-button-outline" href="#/account/signin">
          Sign in
        </a>
      );
    } else {
      let user = loggedInUser();
      return (
        <ul className="usa-unstyled-list usa-nav-secondary-links">

          <li>
            <a href="#/dashboard">{user.name ? user.name : user.email}</a>
          </li>
          <li>
            <a href="#/account/signout">Sign out</a>
          </li>
        </ul>
      );
    }
  }
}
