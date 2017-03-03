import React from 'react';
import 'whatwg-fetch';

import { checkResponse } from './lib';
import { getCurrentLocation } from './session';
import AlertView from './AlertView';

class GeoAlertView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hazard: null }
  }

  componentDidMount() {
    getCurrentLocation()
      .then(loc => {
        fetch(`${API_HOST}/hazards?latitude=${loc.latitude}&longitude=${loc.longitude}`)
          .then(checkResponse)
          .then(response => response.json())
          .then(resp => {
            let hazard = null;
            resp.data.forEach(h => {
              if (h.id == this.props.params.id) {
                hazard = h;
              }
            });

            this.setState({hazard: hazard});
          });
      });
  }

  render() {
    if ( this.state.hazard == null ) {
      return <span>Loading alert...</span>;
    }

    return (
      <section className="usa-grid usa-section">
        <h2>View Alert</h2>
        <AlertView hazard={this.state.hazard} />
      </section>
    )
  }
}

export default GeoAlertView;
