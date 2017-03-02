import './spec_helper';
import React from 'react';
import { mount, shallow } from 'enzyme';

import GeoAlertList from '../src/GeoAlertList';

describe('Geo Alert List', () => {
  it('Should set the state from geolocation, then fetch alerts', done => {
    global.navigator.geolocation = {
      getCurrentPosition: (fn) => {
        fn({
          coords: { latitude: 37.774, longitude: -122.442 }
        });
      }
    };

    global.fetch = (url, opts) => {
      expect(url).to.contain('/hazards?latitude=37');
      expect(url).to.contain('&longitude=-122');
      done();

      const res = new window.Response(`{"status": "success", "data": []}`);
      return Promise.resolve(res);
    }

    const el = mount(<GeoAlertList />);
  });

  it('Should display a list of hazards', () => {
    const el = shallow(<GeoAlertList />);
    el.setState({
      location: { latitude: 1, longitude: 1 },
      hazards: [{ id: 1 }, { id: 2 }]
    });

    expect(el.find('div.alertrow')).to.have.length(2);
  });
});
