import { login } from './spec_helper';
import React from 'react';
import { mount, shallow } from 'enzyme';

import ConfirmPhone from '../src/ConfirmPhone';

describe('Phone confirmation view', () => {
  it('Should attempt to load the phone number on mount', (done) => {
    login();
    global.fetch = function(url, opts) {
      expect(url).to.contain('/phone_numbers');
      done();
    };

    const el = mount(<ConfirmPhone params={{props: {id: 1}}} />);
  });

  it('Should display the current number', () => {
    const el = shallow(<ConfirmPhone />);
    el.setState({phone: '222-333-1234'});
    expect(el.text()).to.contain('222-333-1234');
  });
});
