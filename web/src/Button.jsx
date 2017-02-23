import React from "react";

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

export default Button;
