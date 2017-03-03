import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import GeoLocationBtn from "./GeoLocationBtn";
import InputElement from 'react-input-mask';
import Button from "./Button";
import { geocode, encodeQueryString, checkResponse, fetchAuthd } from "./lib";
import "./App.scss";
import Map from "./Map";
import { hashHistory } from "react-router";
import { apiCreds } from './session';

export default class CreateHazard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      lat: "",
      lng: "",
      address: "",
      category: "",
      linkTitle: "",
      linkURL: "",
      phoneNumber: "",
      radius: "1000", // TODO(paulsmith): XXX
      geocode: null,
      hazard: null,
      emergency: false,
    };
  }

  handleChange(e) {
    let value = e.target.value;
    if (e.target.type == 'checkbox') {
      value = e.target.checked;
    }

    this.setState({
      [e.target.name]: value
    });
  }

  handleGeocodeClick(e) {
    e.preventDefault();
    geocode(this.state.address, (err, res) => {
      if (err !== null) {
        console.error(err);
        return;
      }
      this.setState({ geocode: res, address: "" });
    });
  }

  handleAddressClearClick(e) {
    e.preventDefault();
    this.setState({ geocode: null });
  }

  handleSubmit(e) {
    e.preventDefault();
    let hazard = {
      title: this.state.title,
      message: this.state.message,
      category: this.state.category,
      linkURL: this.state.linkURL,
      linkTitle: this.state.linkTitle,
      phoneNumber: this.state.phoneNumber,
      radius: this.state.radius,
      place: this.state.geocode,
      is_emergency: this.state.emergency
    };
    this.setState({ hazard: hazard });
  }

  handleConfirm(e) {
    e.preventDefault();
    let h = this.state.hazard;
    let qs = encodeQueryString([
      ["title", h.title],
      ["category", h.category],
      ["message", h.message],
      ["latitude", h.place.pt.lat],
      ["longitude", h.place.pt.lng],
      ["radius_in_meters", h.radius],
      ["address", h.place.address],
      ["link_title", h.linkTitle],
      ["link", h.linkURL],
      ["phone_number", h.phoneNumber],
      ["is_emergency", h.is_emergency]
    ]);
    let creds = apiCreds();
    fetchAuthd(API_HOST + "/admin/hazards", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: qs
    })
      .then(checkResponse)
      .then(response => response.json())
      .then(() => hashHistory.push("/admin/hazards"))
      .catch(error => {
        console.error("request failed: %o", error);
      });
  }

  render() {
    return (
      <div>
        {this.state.hazard === null
          ? <section className="usa-section usa-grid">
              <div className="usa-width-one-whole">
              <h2>Create an alert</h2>
                <form className="usa-form" onSubmit={e => this.handleSubmit(e)}>
                  <div>
                    <label>Title</label>
                    <input
                      name="title"
                      value={this.state.title}
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <div>
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={this.state.message}
                      onChange={e => this.handleChange(e)}
                    />
                  </div>

                  <div>
                    <input name="emergency"
                           type="checkbox"
                           checked={this.state.emergecy}
                           onChange={e => this.handleChange(e)} />
                    <label for="emergency"> This alert is an emergency</label>
                  </div>

                  <div>
                    {this.state.geocode === null
                      ? <div>
                          <label>Street address, ZIP Code, or city</label>
                          <input
                            name="address"
                            value={this.state.address}
                            onChange={e => this.handleChange(e)}
                          />
                          <Button
                            type="button"
                            onClick={e => this.handleGeocodeClick(e)}
                          >
                            Update
                          </Button>
                        </div>
                      : <div className="auto-clear">


                        <div className="form-section">
                          <b><Location place={this.state.geocode} /></b>

                          <a className="usa-button usa-button-outline"
                            href="#"
                            onClick={e => this.handleAddressClearClick(e)}
                          >
                            Clear
                          </a>

                          </div>

                        </div>}
                  </div>
                  <div>
                    <label>Category</label>
                    <select
                      name="category"
                      value={this.state.category}
                      onChange={e => this.handleChange(e)}
                    >
                      <option value="">Select one</option>
                      <option value="Earthquake">Earthquake</option>
                      <option value="Wind">Wind</option>
                      <option value="Fire">Fire</option>
                    </select>
                  </div>
                  <div>
                    <label>Link title</label>
                    <input
                      name="linkTitle"
                      value={this.state.linkTitle}
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <div>
                    <label>Link URL</label>
                    <input
                      name="linkURL"
                      value={this.state.linkURL}
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <div>
                    <label>Phone number</label>
                    <InputElement
                      name="phoneNumber"
                      mask="(999) 999-9999"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <Button>Save and preview</Button>
                </form>
              </div>
            </section>
          : <Preview
              hazard={this.state.hazard}
              onSendClick={e => this.handleConfirm(e)}
              onEditClick={e => {
                e.preventDefault();
                this.setState({ hazard: null });
              }}
            />}
      </div>
    );
  }
}

function Location(props) {
  let place = props.place;

  return (
    <div>
      <p>{place.address}</p>
      <Map lat={place.pt.lat} lng={place.pt.lng} />
    </div>
  );
}

function Preview(props) {
  let hazard = props.hazard;

  return (
    <section className="usa-section usa-grid">
      <div className="usa-width-one-whole">
        <h2>Preview alert</h2>
        <div className="form-section">
          <h3>{(hazard.is_emergency) ? 'EMERGENCY: ' : ''}{hazard.title}</h3>
          <span className="usa-label">{hazard.category}</span>
            <hr />
          <div style={{ whiteSpace: "pre-wrap" }}>
            {hazard.message}
          </div>
          <hr />
          <h4>More details</h4>
          <p>
            <a href={hazard.linkURL}>{hazard.linkTitle}</a>
          </p>
          <p>
            <a href={`tel:${hazard.phoneNumber}`}>{hazard.phoneNumber}</a>
          </p>
          <Location place={hazard.place} />
          </div>
          <div>
            <Button type="button" onClick={props.onSendClick}>
              Publish alert
            </Button>
            <a className="usa-button usa-button-outline" href="#" onClick={props.onEditClick}>Edit</a>

        </div>
      </div>
    </section>
  );
}
