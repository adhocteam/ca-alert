import './spec_helper';
import React from 'react';
import { mount } from 'enzyme';

import GeoAlertView from '../src/GeoAlertView';

describe('Geo Alert View', () => {
  it('Should fetch location, then hazards', (done) => {
    global.navigator.geolocation = {
      getCurrentPosition: fn => {
        fn({
          coords: { latitude: 100, longitude: 50 }
        });
      }
    };

    global.fetch = (url, opts) => {
      expect(url).to.contain('/hazards?latitude=100&longitude=50');
      done();

      const res = new window.Response(`{"status": "success", "data": []}`);
      return Promise.resolve(res);
    }

    mount(<GeoAlertView params={{ id: 2 }} />);
  });
});
