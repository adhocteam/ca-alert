import React from "react";
import { Link } from "react-router";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";
import { encodeQueryString } from "./lib";

export default class PlaceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { places: [] };
  }

  componentDidMount() {
    if (isLoggedIn()) {
      const user = loggedInUser();
      const creds = apiCreds();
      let qs = encodeQueryString([
        ["uid", creds.uid],
        ["access-token", creds.accessToken],
        ["client", creds.client],
        ["token-type", "Bearer"],
        ["expiry", creds.expiry]
      ]);
      fetch(API_HOST + "/places?" + qs, {
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {
          console.log("data: %o", data);
          this.setState({ places: data.data });
        })
        .catch(error => {
          console.error("error with request: %o", error);
        });
    }
  }

  render() {
    const listItems = this.state.places.map(place => {
      return (
        <li className="ca-place-list-item" key={place.id}>
          <div className="ca-place-list-item-name">
            {place.name}
          </div>
          <div className="ca-place-list-item-link">
            <a href="#" title="Edit this place">Edit</a>
          </div>
          <div className="ca-place-list-item-link">
            <a href="#" title="Remove this place">Remove</a>
          </div>
        </li>
      );
    });
    return (
      <section className="usa-grid usa-section">
        <h2>Your places</h2>
        <ul className="ca-place-list">
          {listItems}
        </ul>
        <div>
          <Link to="/dashboard/places/new" className="usa-button">
            Add another place
          </Link>
        </div>
      </section>
    );
  }
}
