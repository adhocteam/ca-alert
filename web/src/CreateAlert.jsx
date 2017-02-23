import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import GeoLocationBtn from "./GeoLocationBtn";
import Button from "./Button";
import { geocode } from "./lib";
import "./App.css";
import Map from "./Map";

export default class CreateAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      lat: "",
      lng: "",
      address: "",
      category: null,
      linkTitle: "",
      linkURL: "",
      phoneNumber: "",
      pubDate: "",
      pubTime: "",
      expiryDate: "",
      expiryTime: "",
      geocode: null
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
    console.log("creating alert");
  }

  render() {
    return (
      <section className="usa-section usa-grid">
        <div className="usa-width-one-third">
          <h2>Add an alert</h2>
        </div>
        <div className="usa-width-two-thirds">
          <form className="usa-form">
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
              <select>
                <option>Select one</option>
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
