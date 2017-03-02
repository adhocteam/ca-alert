import './spec_helper';
import React from 'react';
import { shallow } from 'enzyme';

import AlertView from '../src/AlertView';

describe('Alert View', () => {
  it('Should optionally prepend EMERGENCY: to the title', () => {
    let hazard = {
      title: 'hazard',
      category: 'Fire',
      created_at: '2017-01-01T00:00:00Z',
      message: 'message',
      phone: '222-333-1234',
      latitude: 0,
      longitude: 0,
      is_emergency: false
    };

    let el = shallow(<AlertView hazard={hazard} />);
    expect(el.text()).not.to.contain('EMERGENCY');

    hazard.is_emergency = true;
    el = shallow(<AlertView hazard={hazard} />);
    expect(el.text()).to.contain('EMERGENCY: hazard');
  });
})
