const expect = require('chai').expect;
import { newLoginSession } from '../src/session.js';

/**
 * Mock out localStorage
 */
class MockStorage {
  constructor() {
    this.items = {};
  }

  setItem(key, value) {
    this.items[key] = value;
  }

  getItem(key) {
    return (key in this.items) ? this.items[key] : null;
  }

  removeItem(key) {
    delete this.items[key]
  }
}

// Test globals
global.expect = expect;
beforeEach((done) => {
  global.localStorage = new MockStorage();
  done();
});

function login() {
  const user = {email: 'user@example.com', name: 'someone'};
  const now = (new Date()).getTime();
  newLoginSession(user, 'token', 'client', now, 1);
};

export { login };
