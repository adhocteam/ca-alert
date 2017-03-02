import React from "react";
import { Link, hashHistory } from "react-router";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";

export default React.createClass({
  render() {
    if (isLoggedIn()) {
      let user = loggedInUser();
      return (
        <div className="usa-grid usa-section">
          <h1>Dashboard</h1>
          <div className="usa-grid-full  ca-dashboard-nav">
            <div className="usa-width-one-third dashboard-card">
              <Link to="/dashboard/places">
                <h3>Places</h3>
                <p>Add locations you want to receive alerts about</p>
              </Link>
            </div>
            <div className="usa-width-one-third dashboard-card">
              <Link to="/account/communication">
                <h3>Communication preferences</h3>
                <p>Choose how you want to receive alerts</p>
              </Link>
            </div>
            <div className="usa-width-one-third dashboard-card">
              <Link to="/dashboard/alerts">
                <h3>Previous alerts</h3>
                <p>See previous alerts in your places</p>
              </Link>
            </div>
          </div>
          {user.is_admin &&
            <div className="usa-grid-full usa-section">
              <h2>Admin</h2>
              <div className="usa-grid-full  ca-dashboard-nav">
                <div className="usa-width-one-third dashboard-card">
                  <Link to="/admin/hazards">
                    <h3>Alerts</h3>
                    <p>Edit and publish alerts sent to the community</p>
                  </Link>
                </div>
                <div className="usa-width-one-third dashboard-card">
                  <Link to="/admin/analytics">
                    <h3>Analytics</h3>
                    <p>See data on users, alerts sent and communication methods</p>
                  </Link>
                </div>
              </div>
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
