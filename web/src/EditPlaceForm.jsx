import React from "react";
import { hashHistory, Link } from "react-router";
import "whatwg-fetch";
import { encodeQueryString, checkResponse } from "./lib";
import GeoLocationBtn from "./GeoLocationBtn";
import { Point } from "./lib";
import Map from "./Map";
import { apiCreds } from "./session";

export default class EditPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      address: { value: "" },
      name: { value: "" },
      searchBtnEnabled: false,
      geocodeResult: null,
      error: null
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
        this.state.name.value = place[0].name;
        this.setState(this.state);
      });
  }

  handleChange(e) {
    this.state[e.target.name].value = e.target.value;
    this.state.searchBtnEnabled = this.state.address.value.length > 0;
    this.setState(this.state);
  }

  handleSearchBtnClick(e) {
    e.preventDefault();
    // TODO(paulsmith): disable btn
    this.state.geocodeResult = null;
    this.setState(this.state);
    let req = {
      address: this.state.address.value,
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
        this.state.geocodeResult = {
          address: results[0].formatted_address,
          pt: pt
        };
        this.setState(this.state);
      } else {
        this.state.error = "Couldn't find that location, please try again.";
        this.setState(this.state);
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO(paulsmith): disable Save button
    const geocode = this.state.geocodeResult;
    const pt = geocode.pt;
    const creds = apiCreds();
    let qs = encodeQueryString([
      ["name", this.state.name.value],
      ["address", geocode.address],
      ["latitude", pt.lat],
      ["longitude", pt.lng]
    ]);
    fetch(API_HOST + "/places", {
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
      .then(() => hashHistory.push("/dashboard/places"))
      .catch(error => {
        console.error("request failed: %o", error);
      });
  }

  handleContinueClick(e) {
    e.preventDefault();
    this.state.showNamePlace = true;
    this.setState(this.state);
  }

  render() {
    let searchBtn = null;
    if (this.state.searchBtnEnabled) {
      searchBtn = <button onClick={this.handleSearchBtnClick}>Search</button>;
    } else {
      searchBtn = (
        <button
          onClick={this.handleSearchBtnClick}
          disabled="disabled"
          className="usa-button-disabled"
        >
          Search
        </button>
      );
    }

    let geocodeResult = null, map = null, continueBtn;
    let result = this.state.geocodeResult;
    if (result !== null) {
      geocodeResult = (
        <div>
          {result.address}
        </div>
      );
      let pt = result.pt;
      map = <Map lat={pt.lat} lng={pt.lng} />;
    }

    if (result !== null && !this.state.showNamePlace) {
      continueBtn = (
        <a href="#" className="usa-button" onClick={this.handleContinueClick}>
          Continue
        </a>
      );
    }

    let locationForm = null;
    if (!this.state.showNamePlace) {
      locationForm = (
        <div>
          <div>
            <GeoLocationBtn />
          </div>
          <p>OR</p>
          <div>
            <label>
              Street address or ZIP Code
            </label>
            <input
              name="address"
              value={this.state.address.value}
              onChange={this.handleChange}
            />
            {searchBtn}
          </div>
        </div>
      );
    }

    let form = <div>Loading …</div>;
    if (this.state.place !== null) {
      let place = this.state.place;
      form = (
        <form className="usa-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <div>
              <label>Name</label>
              <input
                name="name"
                value={this.state.name.value}
                onChange={this.handleChange}
              />
            </div>
            <Location place={place} />
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

  let handleClick = e => {
    e.preventDefault();
    props.onClick();
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      <div>
        <h4 style={{ float: "left", marginTop: 0 }}>Location</h4>
        <div style={{ float: "right" }}>
          <a href="#" onClick={e => handleClick(e)}>Edit</a>
        </div>
      </div>
      <p style={{ clear: "both" }}>{place.address}</p>
      <Map lat={place.latitude} lng={place.longitude} />
    </div>
  );
}
