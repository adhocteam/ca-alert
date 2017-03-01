import React from "react";
import { Point } from "./lib";
import Spinner from "./Spinner";

export default class GeoLocationBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supported: "geolocation" in navigator,
      getting: false
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ getting: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ getting: false });
        const pt = new Point(
          position.coords.longitude,
          position.coords.latitude
        );
        if (typeof this.props.onLocate === "function") {
          this.props.onLocate(pt);
        }
      },
      err => {
        this.setState({ getting: false });
        if (console && "error" in console) {
          console.error(`geolocation: getting current position: ${err}`);
        }
        if (typeof this.props.onError === "function") {
          let msg = "Geolocation: ";
          switch (err.code) {
            case 1: // PERMISSION_DENIED
              msg += "permission denied";
              break;
            case 2: // POSITION_UNAVAILBLE
              msg += "position unavailable";
              break;
            case 3: // TIMEOUT
              msg += "time-out";
              break;
          }
          this.props.onError(msg);
        }
      }
    );
  }

  render() {
    let classes = ["usa-button-big"];
    let props = {};
    if (!this.state.supported || this.state.getting) {
      classes.push("usa-button-disabled");
      props.disabled = "disabled";
    }
    return (
      <button
        onClick={e => this.handleClick(e)}
        className={classes.join(" ")}
        {...props}
      >
        {this.state.getting ? <Spinner /> : "Use my location"}
      </button>
    );
  }
}
