import React from 'react';

import { fetchAuthd, checkResponse } from './lib';

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comms: {},
      alerts: [],
      users: [],
    };
  }

  componentDidMount() {
    const days = 7;
    fetchAuthd(`${API_HOST}/admin/reports/alerts?days_back=${days}`)
      .then(checkResponse)
      .then(response => response.json())
      .then(resp => {
        this.setState({'alerts': resp.data.reverse()});
      });

    fetchAuthd(`${API_HOST}/admin/reports/communication_methods`)
      .then(checkResponse)
      .then(response => response.json())
      .then(resp => {
        this.setState({'comms': resp.data});
      });

    fetchAuthd(`${API_HOST}/admin/reports/users?days_back=${days}`)
      .then(checkResponse)
      .then(response => response.json())
      .then(resp => {
        this.setState({'users': resp.data.reverse()});
      });
  }

  render() {
    return (
      <section>
        <div className="usa-grid usa-section">
          <h2>Analytics</h2>

          <h3>Communication Methods</h3>
          <table className="usa-table-borderless comms">
            <thead>
              <tr>
                <th>Email</th>
                <th>SMS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.comms.emails}</td>
                <td>{this.state.comms.phone_numbers}</td>
              </tr>
            </tbody>
          </table>

          <h3>User Signups</h3>
          <table className="usa-table-borderless users">
            <thead>
              <tr>
                <th>Date</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(u => {
                return (
                  <tr key={`userrow-${u.date}`}>
                    <td>{u.date}</td>
                    <td>{u.count}</td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </table>

          <h3>Alerts</h3>
          <table className="usa-table-borderless alerts">
            <thead>
              <tr>
                <th>Date</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {this.state.alerts.map(a => {
                return (
                  <tr key={`alertrow-${a.date}`}>
                    <td>{a.date}</td>
                    <td>{a.count}</td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </table>

        </div>
      </section>
    );
  }
}

export default Analytics;
