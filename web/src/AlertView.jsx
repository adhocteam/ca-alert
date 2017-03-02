import React from 'react';

import { fetchAuthd, checkResponse } from './lib';
import AlertComponent from './AlertComponent';

class AlertView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hazard: null};
  }

  componentDidMount() {
    fetchAuthd(`${API_HOST}/alerts`)
      .then(checkResponse)
      .then(response => response.json())
      .then(resp => {
        let hazard = null;
        resp.data.forEach(d => {
          if (d.hazard.id == this.props.params.id) {
            hazard = d.hazard;
          }
        });

        this.setState({hazard: hazard});
      });
  }

  render() {
    return (
      <section className="usa-grid usa-section">
        <h2>View Alert</h2>

        <AlertComponent hazard={this.state.hazard} />
      </section>
    );
  }
}

export default AlertView;
