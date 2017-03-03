import React from "react";
import moment from "moment";

import { fetchAuthd, checkResponse } from "./lib";
import AlertView from './AlertView';

class HazardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hazard: null };
  }

  componentDidMount() {
    let id = this.props.params.id;
    fetchAuthd(`${API_HOST}/admin/hazards/${id}`)
      .then(checkResponse)
      .then(response => response.json())
      .then(resp => {
        this.setState({
          hazard: resp.data
        });
      });
  }

  render() {
    if (this.state.hazard === null) {
      return <span>loading...</span>;
    } else {
      const hazard = this.state.hazard;
      const start = moment(hazard.created_at);
      return (
        <section className="usa-grid usa-section">

          <div className="usa-width-one-whole">

            <AlertView hazard={hazard} />

            <h3>Sent Notifications</h3>
            <ul>
              <li>SMS: {hazard.sms_notifications_sent}</li>
              <li>Email: {hazard.email_notifications_sent}</li>
              <li>Active users: {hazard.user_count_at_creation}</li>
            </ul>
          </div>
        </section>
      );
    }
  }
}

export default HazardView;
