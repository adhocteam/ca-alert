import React from "react";
import { Link, hashHistory } from "react-router";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";

export default React.createClass({
  render() {
    if (isLoggedIn()) {
      let user = loggedInUser();
      return (
        <div className="usa-grid usa-section">
          <h1>Your Dashboard</h1>
          <div className="usa-grid-full  ca-dashboard-nav">
            <div className="usa-width-one-half dashboard-card">
              <Link to="/dashboard/places">
                <h3>Places</h3>
                <p>Add locations you want to receive alerts about</p>
              </Link>
            </div>
          </div>
          <div className="usa-grid-full  ca-dashboard-nav">
            <div className="usa-width-one-half dashboard-card">
              <Link to="/account/communication">
                <h3>Communication preferences</h3>
                <p>Choose how you want to receive alerts</p>
              </Link>
            </div>
          </div>
          <div className="usa-grid-full  ca-dashboard-nav">
            <div className="usa-width-one-half dashboard-card">
              <Link to="/dashboard/alerts">
                <h3>Previous Alerts</h3>
                <p>See previous alerts in your places</p>
              </Link>
            </div>
          </div>
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
