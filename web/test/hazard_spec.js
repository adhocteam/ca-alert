import { login } from './spec_helper';

import React from 'react';
import { shallow, mount } from 'enzyme';

import HazardView from '../src/HazardView';

describe('Hazard View', () => {
  it('Should fetch on mount', (done) => {
    global.fetch = function() { done(); };

    login();
    const params = { props: { id: 1 } };
    const el = mount(<HazardView params={params} />);
  });

  it('Should display the hazard title', () => {
    const hazard = {
      id: 1,
      title: 'title',
      message: 'message',
      category: 'Earthquake',
      created_at: '2017-01-02T03:04:05', // don't specify a tz in test
      phone: '111-222-3456'
    };

    const params = { props: { id: 1 } };
    const el = shallow(<HazardView params={params} />);
    el.setState({hazard: hazard});

    expect(el.text()).to.contain('View Alert');
    expect(el.text()).to.contain('title');
    expect(el.find('.usa-label-big').text()).to.contain('Earthquake');
    expect(el.find('.start-date').text()).to.equal('Jan 2, 2017 3:04 AM');
    expect(el.find('p').text()).to.equal('message');
    expect(el.find('.more-details').text()).to.contain('111-222-3456');
  });
});
