import React from "react";
import { Link } from "react-router";
import { apiCreds } from "./session";
import "whatwg-fetch";
import { checkResponse } from "./lib";

export default class HazardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hazards: []
    };
  }

  componentDidMount() {
    const creds = apiCreds();
    fetch(API_HOST + "/admin/hazards", {
      method: "GET",
      headers: {
        uid: creds.uid,
        "access-token": creds.accessToken,
        client: creds.client,
        "token-type": "Bearer",
        expiry: creds.expiry
      }
    })
      .then(checkResponse)
      .then(response => response.json())
      .then(data => this.setState({ hazards: data.data }))
      .catch(error => console.error("request failed: %o", error));
  }

  render() {
    let hazardList = this.state.hazards.map((hazard, i) => {
      return (
        <tr key={`hazard-${i}`}>
          <td>{hazard.name}</td>
          <td>{hazard.pubDate}</td>
        </tr>
      );
    });
    return (
      <section className="usa-grid usa-section">
        <div className="usa-width-one-third">
          <h2>Alerts</h2>
        </div>
        <div className="usa-width-two-thirds">
          <div>
            <button
              className="usa-button usa-button-disabled"
              disabled="disabled"
            >
              Filter
            </button>
            <Link to="/admin/hazards/new" className="usa-button">
              Create an alert
            </Link>
          </div>
          <table className="usa-table-borderless">
            <tbody>
              {hazardList}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
