import React from 'react';
import { Link } from 'react-router';

import { checkResponse, fetchAuthd, encodeQueryString } from './lib';
import { loggedInUser, setUser } from './session';
import Button from './Button';


class PhoneRow extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  remove(e) {
    e.preventDefault();
    this.props.onRemove(this.props.phone.id);
  }

  toggle(e) {
    e.preventDefault();
    this.props.onToggle(this.props.phone.id,
                        !this.props.phone.notifications_enabled);
  }

  render() {
    const phone = this.props.phone;
    return (
      <tr key={`phonerow-${phone.id}`}>
        <td>
          <input type="checkbox"
                 checked={this.props.phone.notifications_enabled}
                 onChange={this.toggle} />
          <label></label>
        </td>
        <td>{phone.phone_number}</td>
        <td>
          <a role="button" className="remove usa-button usa-button-secondary usa-button-small"
              href={`#${phone.id}`}
              onClick={this.remove}
              title="Remove this place"
            >
              Remove
            </a>
        </td>
      </tr>
    );
  }
}

class CommunicationSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      user: loggedInUser()
    };

    this.toggleEmailNotifs = this.toggleEmailNotifs.bind(this);
  }

  componentDidMount() {
    this.loadNumbers();
  }

  loadNumbers() {
    fetchAuthd(`${API_HOST}/phone_numbers`)
      .then(checkResponse)
      .then(response => response.json())
      .then(resp => {
        this.setState({numbers: resp.data});
      });
  }

  toggleActive(id, value) {
    const payload = encodeQueryString([
      ['notifications_enabled', value]
    ]);

    fetchAuthd(`${API_HOST}/phone_numbers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: payload
    })
      .then(checkResponse)
      .then(() => this.loadNumbers());
  }

  toggleEmailNotifs(e) {
    e.preventDefault();

    const payload = encodeQueryString([
      ['email_notifications_enabled', !this.state.user.email_notifications_enabled]
    ]);

    fetchAuthd(`${API_HOST}/auth`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: payload
    })
      .then(checkResponse)
      .then(response => response.json())
      .then((resp) => {
        const user = resp.data;
        setUser(user);
        this.setState({user: user});
      });
  }

  removeNumber(id) {
    fetchAuthd(`${API_HOST}/phone_numbers/${id}`, {
      method: "DELETE"
    })
      .then(checkResponse)
      .then(() => this.loadNumbers());
  }

  render() {
    let table = null;
    if (this.state.numbers.length > 0) {
      const items = this.state.numbers.map((num) => {
        let remove = (id) => this.removeNumber(id);
        let toggle = (id, value) => this.toggleActive(id, value);
        return <PhoneRow key={`phonerow-${num.id}`}
                         phone={num}
                         onRemove={remove}
                         onToggle={toggle} />
      });

      table = (
        <table className="usa-table-borderless">
           <thead className="usa-sr-only">
-            <tr>
-              <th>Active</th>
-              <th>Phone Number</th>
-              <th></th>
-            </tr>
-          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      );
    }

    return (
      <section>
        <div className="usa-grid usa-section">


          <div className="usa-width-one-whole">
            <h2>Communication settings</h2>
            <div className="table-section">
              <h3>Email</h3>
              <table className="usa-table-borderless">
                 <thead className="usa-sr-only">
 -                <tr>
 -                  <th>Active</th>
 -                  <th>Email Address</th>
 -                </tr>
 -              </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox"
                             checked={this.state.user.email_notifications_enabled}
                             onChange={this.toggleEmailNotifs} />
                      <label></label>
                    </td>
                    <td>
                      {this.state.user.email}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Text message (SMS)</h3>

            {table}

            <Link to="/account/communication/add-phone">
              <Button>Add a phone number</Button>
            </Link>
          </div>
        </div>

      </section>
    );
  }
}

export default CommunicationSettings
export { PhoneRow }
