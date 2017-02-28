import { login } from './spec_helper.js';
import React from 'react';
import { mount } from 'enzyme';

import AddPhone from '../src/AddPhone';

describe('Add Phone Control', () => {
  it('Should add a phone number', () => {
    const el = mount(<AddPhone />);
    expect(el.text()).to.contain('Enter the phone number');
    expect(el.find('input')).to.have.length(1);
    expect(el.find('Button')).to.have.length(1);

    el.find('input').simulate('change', {target: {value: '222-333-1234'}});
    expect(el.state().phone).to.equal('222-333-1234');
  });

  it('Should persist a new phone number', (done) => {
    login();

    global.fetch = function(url, options) {
      expect(url).to.contain('/phone_numbers')
      done();
    }

    const el = mount(<AddPhone />);
    el.setState({phone: '555-555-1212'});
    el.find('form').simulate('submit');
  });
});
