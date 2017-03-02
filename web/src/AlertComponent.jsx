import React from 'react';

import { fetchAuthd, checkResponse } from './lib';
import AlertView from './AlertView';

class AlertComponent extends React.Component {
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

        <AlertView hazard={this.state.hazard} />
      </section>
    );
  }
}

export default AlertComponent;
