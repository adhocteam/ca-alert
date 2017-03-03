import './spec_helper';

import { newLoginSession, logout, getCurrentLocation } from '../src/session';
import SessionStore from '../src/session';

describe('Session Store', () => {
  afterEach(() => {
    SessionStore.removeListener('test');
  });

  it('Should update on login', done => {
    SessionStore.addListener('test', () => { done(); });
    newLoginSession('beep', 'boop', 'blargh', 'foo', 'bar');
  });

  it('Should update on logout', done => {
    SessionStore.addListener('test', () => { done(); });
    logout();
  });
});

describe('getCurrentLocation', () => {
  it('Should return a promise for the current browser location', (done) => {
    global.navigator.geolocation = {
      getCurrentPosition: (fn) => {
        fn({
          coords: {
            latitude: 100,
            longitude: -100
          }
        });
      }
    };

    getCurrentLocation()
      .then(loc => {
        expect(loc.latitude).to.equal(100);
        expect(loc.longitude).to.equal(-100);
        done();
      });
  });
});
