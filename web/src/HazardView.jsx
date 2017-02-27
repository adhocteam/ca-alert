import React from 'react';
import moment from 'moment';

import { fetchAuthd, checkResponse } from './lib';
import Map from './Map';


class HazardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hazard: null };
  }

  componentDidMount() {
    let id = this.props.params.id;
    fetchAuthd(API_HOST + `/admin/hazards`)
      .then(checkResponse)
      .then(response => response.json())
      .then(data => {
        this.setState({
          hazard: data.data[id]
        });
      });
  }

  render() {
    if (this.state.hazard === null) {
      return <span>loading...</span>
    } else {
      const hazard = this.state.hazard;
      const start = moment(hazard.created_at);
      return (
        <section className="usa-grid usa-section">
          <div className="usa-width-one-third">
            <h2>View Alert</h2>
          </div>
          <div className="usa-width-two-thirds">
            <h2>{hazard.title}</h2>
          </div>
          <div className="usa-width-one-third">
            <span className="usa-label-big">{hazard.category}</span>
          </div>

          <div className="usa-width-two-thirds">
            <span className="start-date">{start.format('lll')}</span>
          </div>

          <div className="usa-width-one-whole">
            <p>{hazard.message}</p>
          </div>

          <div className="usa-width-one-whole more-details">
            <a href={"tel:" + hazard.phone}>{hazard.phone}</a>
          </div>

          <div className="usa-width-one-whole">
            <h3>Location</h3>
            <Map lat={hazard.latitude} lng={hazard.longitude} />
          </div>

        </section>
      );
    }
  }
}

export default HazardView;
