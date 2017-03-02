import React from "react";
import { Link, hashHistory } from "react-router";
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
            <li><Link to="/account/communication">Communication preferences</Link></li>
            <li><Link to="/dashboard/alerts">Previous Alerts</Link></li>
            <li>Account settings</li>
            <li><Link to="/account/signout">Sign out</Link></li>
          </ul>
          {user.is_admin &&
            <div>
              <h2>Admin</h2>
              <ul>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/hazards">Alerts</Link></li>
                <li><Link to="/admin/analytics">Analytics</Link></li>
              </ul>
            </div>}
        </div>
      );
    } else {
      // Logo links here, so if we're not logged in, bounce to home
      hashHistory.push('');
      return (
        <div className="usa-grid usa-section">
          <p>Please <Link to="/accounts/signin">sign in</Link>.</p>
        </div>
      );
    }
  }
});
