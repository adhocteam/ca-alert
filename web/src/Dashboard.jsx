import React from "react";
import { Link } from "react-router";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";

export default React.createClass({
  render() {
    if (isLoggedIn()) {
      let user = loggedInUser();
      return (
        <div className="usa-grid usa-section">
          <h1>Your account</h1>
          <p><b>Hello, {user.name ? user.name : user.email}</b></p>
          <ul className="ca-dashboard-nav">
            <li><Link to="/dashboard/places">Places</Link></li>
            <li>Notifications</li>
            <li>Account settings</li>
            <li><Link to="/account/signout">Sign out</Link></li>
          </ul>
        </div>
      );
    } else {
        return (
        <div className="usa-grid usa-section">
          <p>Please <Link to="/accounts/signin">sign in</Link>.</p>
        </div>
      );
    }
  }
});
