import { login } from './spec_helper';
import React from 'react';
import { mount, shallow } from 'enzyme';

import AlertComponent from '../src/AlertComponent';


describe('Alert Component', () => {
  it('Should fetch when mounted', (done) => {
    global.fetch = (url, opts) => {
      expect(url).to.contain('/alerts');
      done();
    };

    login();
    const el = mount(<AlertComponent params={{ id: 2 }} />);
  });

  it('Should load the standard component', () => {
    const el = shallow(<AlertComponent />);
    el.setState({hazard: {id: 1}});

    expect(el.find('AlertView')).to.have.length(1);
  });
});
