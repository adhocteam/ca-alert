import { login } from './spec_helper';

import React from 'react';
import { shallow, mount } from 'enzyme';

import HazardView from '../src/HazardView';
import AlertView from '../src/AlertView';

describe('Hazard View', () => {
  const hazard = {
    id: 2,
    title: 'title',
    message: 'message',
    category: 'Earthquake',
    created_at: '2017-01-02T03:04:05', // don't specify a tz in test
    phone_number: '111-222-3456',
    sms_notifications_sent: 2,
    email_notifications_sent: 3,
    user_count_at_creation: 5
  };

  it('Should fetch on mount', (done) => {
    global.fetch = function(url, opts) {
      expect(url).to.contain('/admin/hazards/2');
      done();
    };

    login();
    const el = mount(<HazardView params={{ id: 2 }} />);
  });

  it('Should display the hazard title', () => {
    const el = shallow(<AlertView hazard={hazard} />);

    expect(el.text()).to.contain('title');
    expect(el.find('.usa-label-big').text()).to.contain('Earthquake');
    expect(el.find('.start-date').text()).to.equal('Jan 2, 2017 3:04 AM');
    expect(el.find('p').text()).to.equal('message');
    expect(el.find('.more-details').text()).to.contain('111-222-3456');
  });

  it('Should display notifications sent', () => {
    const params = { props: { id: 2 } };
    const el = shallow(<HazardView params={params} />);
    el.setState({hazard: hazard});

    expect(el.text()).to.contain('SMS: 2');
    expect(el.text()).to.contain('Email: 3');
    expect(el.text()).to.contain('Active users: 5');
  });
});
