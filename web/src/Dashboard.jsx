import React from "react";
import { Link } from "react-router";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";

export default React.createClass({
  render() {
    if (isLoggedIn()) {
      let user = loggedInUser();
      return (
        <div className="usa-grid usa-section">
          <h1>Your alerts dashboard</h1>
          <p>Manage your alerts</p>
          <p><b>Hello, {user.name ? user.name : user.email}</b></p>
          <p><Link to="/account/signout">Sign out</Link></p>
        </div>
      );
    } else {
        return (
        <div className="usa-grid usa-section">
          <h1>Alerts dashboard</h1>
          <p>Please <Link to="/accounts/signin">sign in</Link>.</p>
        </div>
      );
    }
  }
});
