import React from 'react';
import { hashHistory } from 'react-router';

import { apiCreds } from './session';
import { fetchAuthd, checkResponse, encodeQueryString } from './lib';
import Button from './Button';


class AddPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      error: null
    }
  }

  handleBlur() {
    if (!this.isPhoneValid()) {
      this.setState({error: 'a 10 digit phone number is required'});
    }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({phone: e.target.value, error: null})
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

  isPhoneValid() {
    return this.state.phone.replace(/[^\d]/g, '').length == 10;
  }

  render() {
    const disabled = (!this.isPhoneValid()) ? 'disabled' : null;
    let errmsg = null;
    let errcls = null;

    if (this.state.error != null) {
      errmsg = (
        <span className="usa-input-error-message" role="alert">
          {this.state.error}
        </span>
      );
      errcls = "usa-input-error";
    }

    return (
      <section>
        <div className="usa-grid usa-section">
          <div className="usa-width-one-third">
            <h2>Add phone number</h2>
          </div>

          <div className="usa-width-two-thirds">
            <p>Enter the phone number you wish to recieve alerts at</p>

            <form className="usa-form" onSubmit={e => this.handleSubmit(e)}>
              <div className={errcls}>
                <label htmlFor="phone">Phone number</label>
                {errmsg}
                <input name="phone"
                       value={this.state.title}
                       onChange={e => this.handleChange(e)}
                       onBlur={() => this.handleBlur()}
                       placeholder="Phone number" />
              </div>

              <Button type="submit" disabled={disabled} >Continue</Button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default AddPhone
