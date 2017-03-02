import React from "react";
import "whatwg-fetch";
import { checkResponse } from "./lib";
import { apiCreds } from "./session";

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "", users: [] };
  }

  handleSubmit(e) {
    e.preventDefault();
    let creds = apiCreds();
    let url = API_HOST +
      `/admin/users/search?q=${encodeURIComponent(this.state.query)}`;
    fetch(url, {
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
      .then(data => this.setState({ users: data.data }))
      .catch(err => console.error("request failed: %o", err));
  }

  handleAdminChange(e, user) {
    console.log("change");
  }

  render() {
    let userList = this.state.users.map((user, i) => {
      console.log("user %o: %s", user, i);
      let name = user.name || user.uid;
      return (
        <tr key={`user-${i}`}>
          <td>
            <input
              type="checkbox"
              checked={user.is_admin}
              onChange={e => this.handleAdminChange(e, user)}
            />
          </td>
          <td>
            {name}
          </td>
        </tr>
      );
    });

    return (
      <section className="usa-section usa-grid">

        <div className="usa-width-one-whole">
          <h2>Administrative users</h2>
          <form
            className="usa-search usa-search-small"
            onSubmit={e => this.handleSubmit(e)}
          >
            <div role="search">
              <label for="search-field" className="usa-sr-only" htmlFor="search-field">
                Search
              </label>
              <input
                id="search-field"
                type="search"
                name="search"
                onChange={e => this.setState({ query: e.target.value })}
              />
              <button className="search-button">
                <span className="usa-search-submit-text">Search</span>
              </button>
            </div>
          </form>
          <table className="usa-table-borderless">
            <thead>
              <tr>
                <th>Admin</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {userList}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
