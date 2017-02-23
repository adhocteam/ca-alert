import React from "react";
import { Link } from "react-router";

export default class AlertList extends React.Component {
    render() {
        let alertList = null;
        return (
            <section className="usa-grid usa-section">
              <div className="usa-width-one-third">
                <h2>Alerts</h2>
              </div>
              <div className="usa-width-two-thirds">
                <div>
                  <button className="usa-button usa-button-disabled" disabled="disabled">Filter</button>
                  <Link to="/admin/alerts/new" className="usa-button">Create an alert</Link>
                </div>
                <table className="usa-table-borderless">
                  <tbody>
                    {alertList}
                  </tbody>
                </table>
              </div>
            </section>
        );
    }
}
