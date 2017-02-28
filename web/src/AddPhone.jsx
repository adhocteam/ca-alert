import React from 'react';
import { hashHistory } from 'react-router';

import { apiCreds } from './session';
import { fetchAuthd, checkResponse, encodeQueryString } from './lib';
import Button from './Button';


class AddPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({phone: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    const creds = apiCreds();
    const payload = encodeQueryString([
        ['phone_number', this.state.phone],
        ['notifications_enabled', true]
    ]);

    fetchAuthd(API_HOST + "/phone_numbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: payload
    })
      .then(checkResponse)
      .then(response => response.json())
      .then((resp) => hashHistory.push(`/account/communication/phone/${resp.data.id}`))
      .catch(error => {
        console.error("request failed: %o", error);
      });
  }

  render() {
    return (
      <section>
        <div className="usa-grid usa-section">
          <div className="usa-width-one-third">
            <h2>Add phone number</h2>
          </div>

          <div className="usa-width-two-thirds">
            <p>Enter the phone number you wish to recieve alerts at</p>

            <form className="usa-form" onSubmit={this.handleSubmit}>
              <label htmlFor="phone">Phone number</label>
              <input name="phone"
                     value={this.state.title}
                     onChange={this.handleChange}
                     placeholder="Phone number" />

              <Button type="submit">Continue</Button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default AddPhone
