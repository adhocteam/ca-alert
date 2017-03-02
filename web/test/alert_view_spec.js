import { login } from './spec_helper';
import React from 'react';
import { mount, shallow } from 'enzyme';

import AlertView from '../src/AlertView';


describe('Alert View', () => {
  it('Should fetch when mounted', (done) => {
    global.fetch = (url, opts) => {
      expect(url).to.contain('/alerts');
      done();
    };

    login();
    const el = mount(<AlertView params={{ id: 2 }} />);
  });

  it('Should load the standard component', () => {
    const el = shallow(<AlertView />);
    el.setState({hazard: {id: 1}});

    expect(el.find('AlertComponent')).to.have.length(1);
  });
});
