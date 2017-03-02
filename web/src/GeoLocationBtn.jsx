import React from "react";
import { Point } from "./lib";

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
    let classes = ["usa-button"];
    let props = {};
    if (!this.state.supported || this.state.getting) {
      classes.push("usa-button-disabled");
      props.disabled = "disabled";
    }
    let label = "Use my location";
    if (this.state.getting) {
      label = // Loading spinner ...
      (
        <svg
          width="18px"
          height="18px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          className="uil-default"
        >
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="none"
            className="bk"
          />
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="2"
            ry="2"
            fill="#000000"
            transform="rotate(0 50 50) translate(0 -30)"
          >
            {" "}
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin="0s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="2"
            ry="2"
            fill="#000000"
            transform="rotate(45 50 50) translate(0 -30)"
          >
            {" "}
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin="0.125s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="2"
            ry="2"
            fill="#000000"
            transform="rotate(90 50 50) translate(0 -30)"
          >
            {" "}
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin="0.25s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="2"
            ry="2"
            fill="#000000"
            transform="rotate(135 50 50) translate(0 -30)"
          >
            {" "}
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin="0.375s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="2"
            ry="2"
            fill="#000000"
            transform="rotate(180 50 50) translate(0 -30)"
          >
            {" "}
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="2"
            ry="2"
            fill="#000000"
            transform="rotate(225 50 50) translate(0 -30)"
          >
            {" "}
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin="0.625s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="2"
            ry="2"
            fill="#000000"
            transform="rotate(270 50 50) translate(0 -30)"
          >
            {" "}
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin="0.75s"
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="46.5"
            y="40"
            width="7"
            height="20"
            rx="2"
            ry="2"
            fill="#000000"
            transform="rotate(315 50 50) translate(0 -30)"
          >
            {" "}
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin="0.875s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      );
    }
    return (
      <button
        onClick={e => this.handleClick(e)}
        className={classes.join(" ")}
        {...props}
      >
        {label}
      </button>
    );
  }
}
