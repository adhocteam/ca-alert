import { login } from './spec_helper';
import React from 'react';
import { mount, shallow } from 'enzyme';

import Analytics from '../src/Analytics';

describe('Analytics view', () => {
  it('Should attempt to load data when mounted', done => {
    let found = { users: false, comms: false, alerts: false }
    global.fetch = (url, opts) => {
      if (url.includes('/admin/reports/alerts')) {
        found.alerts = true;
      }

      if (url.includes('/admin/reports/communication_methods')) {
        found.comms = true;
      }

      if (url.includes('/admin/reports/users')) {
        found.users = true;
      }

      if (found.users && found.comms && found.alerts) {
        done();
      }

      const res = new window.Response(`{"status": "success", "data": []}`);
      return Promise.resolve(res);
    }

    login(true);
    const el = mount(<Analytics />);
  });

  it('Should display tables for individual items', () => {
    const el = shallow(<Analytics />);
    el.setState({
      alerts: [{date: '2017-02-28', count: 8}, {date: '2017-03-01', count: 10}],
      comms: {emails: 5, phone_numbers: 26},
      users: [{date: '2017-02-28', count: 26}, {date: '2017-03-01', count: 28}]
    });

    const alertTable = el.find('table.alerts');
    expect(alertTable).to.have.length(1);
    expect(alertTable.find('td')).to.have.length(4);

    let exp = '2017-02-28' + '8' + '2017-03-01' + '10';
    expect(alertTable.find('tbody').text()).to.contain(exp);

    const commTable = el.find('table.comms');
    expect(commTable).to.have.length(1);
    expect(commTable.find('td')).to.have.length(2);
    expect(commTable.text()).to.contain('5');
    expect(commTable.text()).to.contain('26');

    const userTable = el.find('table.users');
    expect(userTable).to.have.length(1);
    expect(userTable.find('td')).to.have.length(4);

    exp = '2017-02-28' + '26' + '2017-03-01' + '28';
    expect(userTable.find('tbody').text()).to.contain(exp);
  });
});
