import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import 'whatwg-fetch';

import { checkResponse } from './lib';
import { getCurrentLocation } from './session';

class GeoAlertList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      hazards: []
    };
  }

  componentDidMount() {
    // Grab the current location
    getCurrentLocation()
      .then(loc => {
        fetch(`${API_HOST}/hazards?latitude=${loc.latitude}&longitude=${loc.longitude}`)
          .then(checkResponse)
          .then(response => response.json())
          .then(resp => {
            this.setState({
              location: loc,
              hazards: resp.data.reverse()
            });
          });
      });
  }

  render() {
    if (this.state.location == null) {
      return <span>Loading location...</span>;
    }

    if (this.state.hazards.length == 0) {
      return <span>No recent alerts for your location</span>;
    }

    return (
      <section className="usa-section usa-grid">
        <h2>Recent alerts near your location</h2>
        {this.state.hazards.map((h) => {
          const time = moment(h.created_at).format('MMM Do');
          return (
            <div className="alertrow" key={`alertrow-${h.id}`}>
              <div className="usa-width-two-thirds">
                <h3>
                  <Link to={`/alerts/${h.id}`} >{h.title}</Link>
                </h3>
                <span className="usa-label">{h.category}</span>
              </div>

              <div className="usa-width-one-third">
                {time}
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}

export default GeoAlertList;
