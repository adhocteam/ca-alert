import './spec_helper'
import React from 'react';
import { shallow } from 'enzyme';

import { newLoginSession } from '../src/session';
import Nav from '../src/Nav';

describe('Nav Component', () => {
  it('Should show a non-logged in version by default', () => {
    const el = shallow(<Nav />);

    const signup = el.find({href: '#/account/signup'});
    expect(signup.length).to.equal(1)
    expect(signup.text()).to.contain('Sign up for new account');

    const signin = el.find({href: '#/account/signin'});
    expect(signin.length).to.equal(1);
    expect(signin.text()).to.contain('Sign in to your account');
  });

  it('Should show a logged in version w/ a valid session', () => {
    const user = {email: 'user@example.com', name: 'someone'};
    const now = (new Date()).getTime();
    newLoginSession(user, 'token', 'client', now, 1);

    const el = shallow(<Nav />);

    const dashlink = el.find({href: '#/dashboard'});
    expect(dashlink.length).to.equal(1);
    expect(dashlink.text()).to.contain('someone');

    const signout = el.find({href: '#/account/signout'});
    expect(signout.length).to.equal(1);
    expect(signout.text()).to.contain('Sign out');
  });
});
