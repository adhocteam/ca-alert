import './spec_helper';
import React from 'react';
import { shallow } from 'enzyme';

import CreateHazard from '../src/CreateHazard';

describe('Hazard creation form', () => {
  it('Should contain a toggle for emergencies', () => {
    const el = shallow(<CreateHazard />);
    expect(el.find('input[type="checkbox"]')).to.have.length(1);
    expect(el.state().emergency).to.be.false;

    let e = {
      target: { name: 'emergency', checked: true, type: 'checkbox' }
    };

    el.find('input[type="checkbox"]').simulate('change', e);
    expect(el.state().emergency).to.be.true;

    // Toggle e.checked and ensure it can be switched off
    e.target.checked = false;
    el.find('input[type="checkbox"]').simulate('change', e);
    expect(el.state().emergency).to.be.false;
  });
});
