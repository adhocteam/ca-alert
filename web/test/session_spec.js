import './spec_helper';

import { newLoginSession, logout } from '../src/session';
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
