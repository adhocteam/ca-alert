import { login } from './spec_helper.js';
import React from 'react';
import { mount, shallow } from 'enzyme';

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

  it('Should display a validation message', () => {
    const el = shallow(<AddPhone />);
    el.find('input[name="phone"]').simulate('change', {
      preventDefault: () => {},
      target: { name: 'phone', value: '1234' }
    });

    expect(el.find('Button').props().disabled).to.equal('disabled');

    // We should only show a validation message after blur
    expect(el.find('div.usa-input-error')).to.have.length(0);

    el.find('input[name="phone"]').simulate('blur');

    expect(el.find('div.usa-input-error')).to.have.length(1);
    expect(el.contains(
        <span className="usa-input-error-message" role="alert">
          a 10 digit phone number is required
        </span>
    )).to.be.true;

    el.find('input[name="phone"]').simulate('change', {
      preventDefault: () => {},
      target: { name: 'phone', value: '222-333-1234' }
    });

    // Changing the input should clear the error
    expect(el.find('div.usa-input-error')).to.have.length(0);
    expect(el.find('Button').props().disabled).to.be.null;
  });
});
