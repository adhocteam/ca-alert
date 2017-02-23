import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import GeoLocationBtn from "./GeoLocationBtn";
import Button from "./Button";
import { geocode, encodeQueryString, checkResponse } from "./lib";
import "./App.css";
import Map from "./Map";
import "whatwg-fetch";
import { apiCreds } from "./session";
import { hashHistory } from "react-router";

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
      pubDate: "",
      pubTime: "",
      expiryDate: "",
      expiryTime: "",
      radius: "1000", // TODO(paulsmith): XXX
      geocode: null,
      hazard: null
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
      pubDate: this.state.pubDate,
      pubTime: this.state.pubTime,
      expiryDate: this.state.expiryDate,
      expiryTime: this.state.expiryTime,
      linkURL: this.state.linkURL,
      linkTitle: this.state.linkTitle,
      phoneNumber: this.state.phoneNumber,
      radius: this.state.radius,
      place: this.state.geocode
    };
    this.setState({ hazard: hazard });
  }

  handleConfirm(e) {
    e.preventDefault();
    let h = this.state.hazard;
    let qs = encodeQueryString([
      ["title", h.title],
      ["message", h.message],
      ["latitude", h.place.pt.lat],
      ["longitude", h.place.pt.lng],
      ["radius_in_meters", h.radius],
      ["address", h.place.address],
      ["link", h.linkURL],
      ["phone_number", h.phoneNumber]
    ]);
    let creds = apiCreds();
    fetch(API_HOST + "/admin/hazards", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        uid: creds.uid,
        "access-token": creds.accessToken,
        client: creds.client,
        "token-type": "Bearer",
        expiry: creds.expiry
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
              <div className="usa-width-one-third">
                <h2>Add an alert</h2>
              </div>
              <div className="usa-width-two-thirds">
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
                  <Tabs>
                    <TabList>
                      <Tab>Lat/Lng</Tab>
                      <Tab>Geolocate</Tab>
                      <Tab>Address</Tab>
                    </TabList>
                    <TabPanel>
                      Latitude/Longitude
                      <label>Latitude</label>
                      <input
                        name="lat"
                        value={this.state.lat}
                        onChange={e => this.handleChange(e)}
                      />
                      <label>Longitude</label>
                      <input
                        name="lng"
                        value={this.state.lng}
                        onChange={e => this.handleChange(e)}
                      />
                      <Button>Update</Button>
                    </TabPanel>
                    <TabPanel>
                      Geolocate
                      <GeoLocationBtn />
                    </TabPanel>
                    <TabPanel>
                      Address
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
                            <div style={{ float: "right" }}>
                              <a
                                href="#"
                                onClick={e => this.handleAddressClearClick(e)}
                              >
                                Clear
                              </a>
                            </div>
                            <Location place={this.state.geocode} />
                          </div>}
                    </TabPanel>
                  </Tabs>
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
                    <input
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <div>
                    <p><b>Publish time</b></p>
                    <label>Date</label>
                    <input
                      type="date"
                      name="pubDate"
                      value={this.state.pubDate}
                      onChange={e => this.handleChange(e)}
                    />
                    <label>Time</label>
                    <input
                      name="pubTime"
                      value={this.state.pubTime}
                      onChange={e => this.handleChange(e)}
                    />
                  </div>
                  <div>
                    <p><b>Expiration (optional)</b></p>
                    <label>Date</label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={this.state.expiryDate}
                      onChange={e => this.handleChange(e)}
                    />
                    <label>Time</label>
                    <input
                      name="expiryTime"
                      value={this.state.expiryTime}
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
      <div className="usa-width-one-third">
        <h2>Preview alert</h2>
      </div>
      <div className="usa-width-two-thirds">
        <h3>{hazard.title}</h3>
        <span className="usa-label">{hazard.category}</span>
        <div>
          <p><b>{hazard.pubDate} {hazard.pubTime}</b></p>
          <p>until {hazard.expiryDate} {hazard.expiryTime}</p>
        </div>
        <div style={{ whiteSpace: "pre-wrap" }}>
          {hazard.message}
        </div>
        <h4>More details</h4>
        <p>
          <a href={hazard.linkURL}>{hazard.linkTitle}</a>
        </p>
        <p>
          <a href={`tel:${hazard.phoneNumber}`}>{hazard.phoneNumber}</a>
        </p>
        <Location place={hazard.place} />
        <div>
          <Button type="button" onClick={props.onSendClick}>
            Send for approval
          </Button>
          <a href="#" onClick={props.onEditClick}>Edit</a>
        </div>
      </div>
    </section>
  );
}
