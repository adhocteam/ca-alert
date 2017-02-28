import React from 'react';
import moment from 'moment';

import { fetchAuthd, checkResponse } from './lib';

function AlertRow(props) {
  const hazard = props.alert.hazard;
  const place = props.alert.place;
  const time = moment(props.alert.created_at).format('MMM Do');

  return (
    <section>
      <div className="usa-width-two-thirds">
        <h3>{hazard.title}</h3>
        <span className="usa-label">{place.name}</span>
      </div>

      <div className="usa-width-one-third">
        {time}
      </div>
    </section>
  )
}

class AlertList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {alerts: []};
  }

  componentDidMount() {
    fetchAuthd(`${API_HOST}/alerts`)
      .then(checkResponse)
      .then(response => response.json())
      .then(resp => {
        this.setState({alerts: resp.data});
      });
  }

  render() {
    return (
      <section>
        <div className="usa-grid usa-section">
          <div className="usa-width-one-third">
            <h2>Your alerts</h2>
          </div>

          <div className="usa-width-two-thirds">
            {this.state.alerts.map((a) => {
              return (<AlertRow key={a.hazard.id} alert={a} />)
            })}
          </div>
        </div>
      </section>
    );
    return <span>Hello world</span>
  }
}

export default AlertList;
export { AlertRow };
