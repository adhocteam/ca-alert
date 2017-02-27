const expect = require('chai').expect;
const jsdom = require('jsdom').jsdom;

import { newLoginSession } from '../src/session.js';

/**
 * Start the jsdom env so we can use mount
 */
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

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
global.API_HOST = 'not in test';

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
