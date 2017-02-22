import React from "react";

export default class GeoLocationBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log("geolocate");
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className="usa-button-big usa-button-disabled"
        disabled="disabled"
      >
        Use my location
      </button>
    );
  }
}
