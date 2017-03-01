import React from "react";

export default class Spinner extends React.Component {
  render() {
    return (
      <svg
        width={this.props.size}
        height={this.props.size}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="uil-default"
      >
        <rect x="0" y="0" width="100" height="100" fill="none" className="bk" />
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
}

Spinner.defaultProps = {
    size: "18px"
};
