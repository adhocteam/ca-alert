import React from "react";
import { isLoggedIn, loggedInUser } from "./session";

export default class Nav extends React.Component {
  render() {
    if (!isLoggedIn()) {
      return (
        <ul className="usa-unstyled-list usa-nav-secondary-links">
          <li className="js-search-button-container">
            <button className="usa-header-search-button js-search-button">
              Search
            </button>
          </li>
          <li>
            <a href="#/account/signup">Sign up for new account</a>
          </li>
          <li>
            <a href="#/account/signin">Sign in to your account</a>
          </li>
        </ul>
      );
    } else {
      let user = loggedInUser();
      return (
        <ul className="usa-unstyled-list usa-nav-secondary-links">
          <li className="js-search-button-container">
            <button className="usa-header-search-button js-search-button">
              Search
            </button>
          </li>
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
