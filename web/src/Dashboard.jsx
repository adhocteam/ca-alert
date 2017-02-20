import React from "react";
import { Link } from "react-router";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";

export default React.createClass({
  render() {
    if (isLoggedIn()) {
      let user = loggedInUser();
      return (
        <div className="usa-grid usa-section">
          <h1>Hello, {user.name ? user.name : user.email}</h1>
          <Link to="/account/signout">Sign out</Link>
        </div>
      );
    } else {
        return (
        <div className="usa-grid usa-section">
          <h1>App home/dashboard goes here</h1>
        </div>
      );
    }
  }
});
