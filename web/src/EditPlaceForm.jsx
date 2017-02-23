import React from "react";
import { hashHistory, Link } from "react-router";
import "whatwg-fetch";
import { encodeQueryString, checkResponse } from "./lib";
import GeoLocationBtn from "./GeoLocationBtn";
import { Point } from "./lib";
import Map from "./Map";
import { apiCreds } from "./session";
import "./App.css";

export default class EditPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      name: "",
      show: {
        locationChooser: false
      }
    };
  }

  componentDidMount() {
    // TODO(paulsmith): need a get place by ID API endpoint
    let id = parseInt(this.props.params.id, 10);
    let creds = apiCreds();
    fetch(API_HOST + "/places", {
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
      .then(data => {
        let places = data.data;
        let place = places.filter(p => p.id === id);
        if (place.length !== 1) {
          throw new Error(`couldn't find place by ID ${id}`);
        }
        this.state.place = place[0];
        this.state.name = place[0].name;
        this.setState(this.state);
      });
  }

  handleChange(e) {
    this.state.name = e.target.value;
    this.setState(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO(paulsmith): disable Save button
    const place = this.state.place;
    const creds = apiCreds();
    let qs = encodeQueryString([
      ["name", this.state.name],
      ["address", place.address],
      ["latitude", place.latitude],
      ["longitude", place.longitude]
    ]);
    fetch(API_HOST + `/places/${place.id}`, {
      method: "PATCH",
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
      .then(() => hashHistory.push("/dashboard/places"))
      .catch(error => {
        console.error("request failed: %o", error);
      });
  }

  handleLocationEditCancelClick(e) {
    e.preventDefault();
    let show = Object.assign({}, this.state.show);
    show.locationChooser = !this.state.show.locationChooser;
    this.setState({
      show: show
    });
  }

  handleNewLocation(loc) {
    let place = this.state.place;
    place.address = loc.address;
    place.latitude = loc.pt.lat;
    place.longitude = loc.pt.lng;
    let show = Object.assign({}, this.state.show);
    show.locationChooser = false;
    this.setState({
      place: place,
      show: show
    });
  }

  render() {
    let form = <div>Loading …</div>;
    if (this.state.place !== null) {
      let place = this.state.place;
      form = (
        <form className="usa-form" onSubmit={e => this.handleSubmit(e)}>
          <fieldset>
            <div>
              <label>Name</label>
              <input
                name="name"
                value={this.state.name}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="auto-clear">
              <div style={{ float: "right" }}>
                <a
                  href="#"
                  onClick={e => this.handleLocationEditCancelClick(e)}
                >
                  {this.state.show.locationChooser ? "Cancel" : "Edit"}
                </a>
              </div>
              <p><b>Location</b></p>
            </div>
            {this.state.show.locationChooser
              ? <LocationChooser
                  onChoose={loc => this.handleNewLocation(loc)}
                />
              : <Location place={place} />}
            <div>
              <button>Save</button>
              <Link to="/dashboard/places">Cancel</Link>
            </div>
          </fieldset>
        </form>
      );
    }

    return (
      <section className="usa-grid usa-section">
        <div className="usa-width-one-third">
          <h2>Edit place</h2>
        </div>
        <div className="usa-width-two-thirds">
          {form}
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
      <Map lat={place.latitude} lng={place.longitude} />
    </div>
  );
}

function Button(props) {
  let opts = {
    type: props.type
  };
  let classes = "usa-button";
  if (props.disabled) {
    opts.disabled = "disabled";
    classes += " usa-button-disabled";
  }
  if (typeof opts.type === "undefined") {
    opts.type = "submit";
  }
  if (typeof props.onClick !== "undefined") {
    opts.onClick = props.onClick;
  }

  return <button className={classes} {...opts}>{props.children}</button>;
}

class LocationChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };
  }

  handleSearch(e) {
    e.preventDefault();
    // TODO(paulsmith): disable btn
    let req = {
      address: this.state.address,
      componentRestrictions: {
        country: "US",
        administrativeArea: "California"
      }
    };
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode(req, (results, status) => {
      if (status === "OK") {
        let loc = results[0].geometry.location;
        let pt = new Point(loc.lng(), loc.lat());
        this.props.onChoose({
          address: results[0].formatted_address,
          pt: pt
        });
      } else {
        console.error("Couldn't find that location, please try again.");
      }
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ address: e.target.value });
  }

  render() {
    return (
      <div>
        <div>
          <GeoLocationBtn />
        </div>
        <p>OR</p>
        <div>
          <label>
            Street address, ZIP Code, or city
          </label>
          <input
            name="address"
            value={this.state.address.value}
            onChange={e => this.handleChange(e)}
          />
          <Button
            type="button"
            disabled={!this.state.address.length}
            onClick={e => this.handleSearch(e)}
          >
            Search
          </Button>
        </div>
      </div>
    );
  }
}
