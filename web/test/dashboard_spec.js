import { login } from './spec_helper';
import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from '../src/Dashboard';

describe('Dashboard view', () => {
  it('Should display different links for admin vs resident', () => {
    const both = [
      '/dashboard/places',
      '/account/communication',
      '/dashboard/alerts'
    ];

    const admin = [
      '/admin/hazards',
      '/admin/analytics'
    ];

    login();  // login as a resident
    let el = shallow(<Dashboard />);

    expect(el.find('Link')).to.have.length(both.length);
    both.forEach(path => {
      expect(el.find({ to: path })).to.have.length(1);
    });

    // reload with an admin
    login(true);
    el = shallow(<Dashboard />);
    expect(el.find('Link')).to.have.length(both.length + admin.length);
    (both.concat(admin)).forEach(path => {
      expect(el.find({ to: path })).to.have.length(1);
    });
  });
});
