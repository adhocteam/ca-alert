import React from "react";
import { hashHistory, Link } from "react-router";
import { encodeQueryString, fetchAuthd } from "./lib";
import GeoLocationBtn from "./GeoLocationBtn";
import { Point } from "./lib";
import Map from "./Map";
import ErrorAlert from "./Error";

export default class AddPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: { value: "" },
      name: { value: "" },
      searchBtnEnabled: false,
      geocodeResult: null,
      error: null,
      showNamePlace: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
    this.handleSearchBtnClick = this.handleSearchBtnClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      address: this.state.address.value
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
    let qs = encodeQueryString([
      ["name", this.state.name.value],
      ["address", geocode.address],
      ["latitude", pt.lat],
      ["longitude", pt.lng]
    ]);
    fetchAuthd(API_HOST + "/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: qs
    })
      .then(response => response.json())
      .then(data => {
        hashHistory.push("/dashboard/places");
      })
      .catch(error => {
        console.error("request failed: %o", error);
      });
  }

  handleContinueClick(e) {
    e.preventDefault();
    this.setState({ showNamePlace: true });
  }

  handleGeoLocate(pt) {
    this.setState({
      geocodeResult: {
        address: `(${pt.lng}, ${pt.lat})`,
        pt: pt
      }
    });
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

    let locationForm = null, namePlace = null;
    if (!this.state.showNamePlace) {
      locationForm = (
        <div>
          <div>
            <GeoLocationBtn
              onLocate={pt => this.handleGeoLocate(pt)}
              onError={err => this.setState({ error: err })}
            />
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
    } else {
      namePlace = (
        <div>
          <label>Give your place a name (e.g., Home or Work)</label>
          <input
            name="name"
            value={this.state.name.value}
            onChange={this.handleChange}
          />
          <button>Save</button>
        </div>
      );
    }

    return (
      <section className="usa-grid usa-section">
        <div className="usa-width-one-whole">
          <h2>Add a place</h2>
          {this.state.error ? <ErrorAlert error={this.state.error} /> : null}
          <form className="usa-form" onSubmit={this.handleSubmit}>
            <fieldset>
              <legend className="usa-drop_text">
                Choose a location you want to receive alerts about
              </legend>
              {locationForm}
              {map}
              {continueBtn}
              {namePlace}
            </fieldset>
            <Link to="/dashboard/places">Cancel</Link>
          </form>
        </div>
      </section>
    );
  }
}
