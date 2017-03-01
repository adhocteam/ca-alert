import React from 'react';
import { hashHistory } from 'react-router';

import Button from './Button';
import { fetchAuthd, checkResponse, encodeQueryString } from './lib';

class ConfirmPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      pin: '',
      error: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let id = this.props.params.id;
    fetchAuthd(API_HOST + '/phone_numbers')
      .then(checkResponse)
      .then(response => response.json())
      .then(resp => {
        let phone = null;
        resp.data.forEach((d) => {
          if (d.id == id) {
            phone = d.phone_number;
          }
        });

        this.setState({phone: phone});
      });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({pin: e.target.value, error: null});
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = `${API_HOST}/phone_numbers/${this.props.params.id}/verify`;
    const payload = encodeQueryString([
        ['pin', this.state.pin]
    ]);

    fetchAuthd(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: payload
    })
      .then(checkResponse)
      .then(response => response.json())
      .then(resp => hashHistory.push('/account/communication'))
      .catch(error => {
        this.setState({error: "Invalid confirmation code"});
        console.error("request failed: %o", error);
      });
  }

  render() {
    if (!this.state.phone) {
      return <span>loading...</span>
    } else {
      let errmsg = null;
      let errcls = null;

      if (this.state.error != null) {
        errcls = "usa-input-error";
        errmsg = <span className="usa-input-error-message" role="alert">{this.state.error}</span>;
      }

      return (
        <section>
          <div className="usa-grid usa-section">
            <div className="usa-width-one-third">
              <h2>Confirm phone number</h2>
            </div>

            <div className="usa-width-two-thirds">
              <h3>Confirmation code sent</h3>
              <p>
                To confirm your phone number, please enter
                the pin code that we sent to <strong>{this.state.phone}</strong>
              </p>

              <form className="usa-form" onSubmit={this.handleSubmit}>
                <div className={errcls}>
                  <label htmlFor="pin">Confirmation code</label>
                  {errmsg}
                  <input type="text"
                         name="pin"
                         value={this.state.pin}
                         onChange={this.handleChange}
                         placeholder="Confirmation code" />
                </div>

                <Button type="submit">Confirm</Button>
              </form>
            </div>
          </div>
        </section>
      );
    }
  }
}

export default ConfirmPhone
