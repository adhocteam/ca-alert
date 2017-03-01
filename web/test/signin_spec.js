import './spec_helper';
import React from 'react';
import { mount } from 'enzyme';

import SignInForm from '../src/SignInForm';

describe('Sign In Form', () => {
  it('Should enable submit before blur', () => {
    const el = mount(<SignInForm />);
    el.setState({
      email: {value: 'user@example.com', isValid: true},
    });

    expect(el.find('[type="submit"]').props().disabled).to.equal('disabled');

    el.find('[type="password"]').simulate('change', {
      target: { name: 'signin-password', value: '12345678' }
    });

    expect(el.find('[type="submit"]').props().disabled).to.be.undefined;
  });
});
