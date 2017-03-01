import React from "react";

export default function ErrorAlert(props) {
    return (
        <div className="usa-alert usa-alert-error" role="alert">
          <div className="usa-alert-body">
            <h3 className="usa-alert-heading">Oops! There was an error</h3>
            <p className="usa-alert-text">{props.error}</p>
          </div>
        </div>
    );
}
