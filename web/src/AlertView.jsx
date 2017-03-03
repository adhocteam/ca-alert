import React from 'react';
import moment from 'moment';

import Map from './Map';

export default function AlertView(props) {
  if (props.hazard == null) {
    return <span>loading...</span>;
  } else {
    const start = moment(props.hazard.created_at);

    let linkPart = null;

    if (props.hazard.link != null) {
      linkPart = <div className="usa-width-one-whole more-details">
          <a href={props.hazard.link}>{props.hazard.link_title || props.hazard.link}</a>
        </div>;
    }

    return (
      <section>
      <div className="form-section">
        <h2>{(props.hazard.is_emergency) ? 'EMERGENCY: ' : ''}{props.hazard.title}</h2>
          <span className="usa-label-big">{props.hazard.category}</span>
          <span className="start-date">{start.format("lll")}</span>
          <hr />
          <p>{props.hazard.message}</p>
          <a href={`tel:${props.hazard.phone_number}`}>{props.hazard.phone_number}</a>
          {linkPart}
          <div className="map-section">
            <Map lat={props.hazard.latitude} lng={props.hazard.longitude} />
          </div>  
        </div>
      </section>
    );
  }
}
