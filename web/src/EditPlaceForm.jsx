import React from "react";
import { hashHistory, Link } from "react-router";
import { encodeQueryString, checkResponse, fetchAuthd } from "./lib";
import GeoLocationBtn from "./GeoLocationBtn";
import { Point, geocode } from "./lib";
import Map from "./Map";
import "./App.scss";
import Button from "./Button";
import ErrorAlert from "./Error";

export default class EditPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      name: "",
      show: {
        locationChooser: false
      },
      error: null
    };
  }

  componentDidMount() {
    let id = this.props.params.id;
    fetchAuthd(API_HOST + `/places/${id}`)
      .then(checkResponse)
      .then(response => response.json())
      .then(data => {
        let place = data.data;
        this.setState({
          place: place,
          name: place.name
        });
      });
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO(paulsmith): disable Save button
    const place = this.state.place;
    let qs = encodeQueryString([
      ["name", this.state.name],
      ["address", place.address],
      ["latitude", place.latitude],
      ["longitude", place.longitude]
    ]);
    fetchAuthd(API_HOST + `/places/${place.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
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
                  onError={err => this.setState({ error: err })}
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
        <div className="usa-width-one-whole">
          <h2>Edit place</h2>
          {this.state.error ? <ErrorAlert error={this.state.error} /> : null}
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
    geocode(this.state.address, (err, res) => {
      if (err !== null) {
        console.error(err);
        return;
      }
      this.props.onChoose(res);
    });
  }

  handleChange(e) {
    this.setState({ address: e.target.value });
  }

  handleGeoLocate(pt) {
    this.props.onChoose({
      address: `(${pt.lng}, ${pt.lat})`,
      pt: pt
    });
  }

  handleGeoLocateError(err) {
    if (this.props.onError) {
      this.props.onError(err);
    }
  }

  render() {
    return (
      <div>
        <div>
          <GeoLocationBtn
            onLocate={pt => this.handleGeoLocate(pt)}
            onError={err => this.handleGeoLocateError(err)}
          />
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
