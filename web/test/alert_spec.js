import { login } from './spec_helper';
import React from 'react';
import { mount, shallow } from 'enzyme';

import AlertList from '../src/AlertList';
import { AlertRow } from '../src/AlertList';

describe('Alert View', () => {
  it('Should load alerts when mounted', (done) => {
    global.fetch = (url, opts) => {
      expect(url).to.contain('/alerts');
      done();
    };

    login();
    const el = mount(<AlertList />);
  });

  it('Should display a series of alert rows', () => {
    const el = shallow(<AlertList />);
    el.setState({alerts: [
      {hazard: {id: 1}},
      {hazard: {id: 2}}
    ]});

    expect(el.find('AlertRow')).to.have.length(2);
  });

  describe('Alert Row', () => {
    const alertObject = {
      created_at: '2017-01-02T12:04:05',
      hazard: {
        id: 2,
        title: 'a hazard title',
        category: 'Earthquake'
      },
      place: {
        id: 3,
        name: 'Home'
      }
    };

    it('Should display a standard alert', () => {
      const el = shallow(<AlertRow alert={alertObject} />);
      const text = el.text();

      expect(el.find({ to: '/dashboard/alerts/2' })).to.have.length(1);
      expect(text).to.contain('Home');
      expect(text).to.contain('Jan 2nd');
    });
  });
});
