import { login } from "./spec_helper";

import React from "react";
import { mount, shallow } from "enzyme";

import Nav from "../src/Nav";
import { newLoginSession, logout } from "../src/session";

describe("Nav Component", () => {
  it("Should show a non-logged in version by default", () => {
    const el = shallow(<Nav />);

    const signin = el.find('a');
    expect(signin.length).to.equal(1);
    expect(signin.text()).to.contain("Sign up");
  });

  it("Should show a logged in version w/ a valid session", () => {
    login();
    const el = shallow(<Nav />);

    const dashlink = el.find({ href: "#/dashboard" });
    expect(dashlink.length).to.equal(1);
    expect(dashlink.text()).to.contain("someone");

    const signout = el.find({ href: "#/account/signout" });
    expect(signout.length).to.equal(1);
    expect(signout.text()).to.contain("Sign out");
  });

  it("Should update on login/out", () => {
    const el = mount(<Nav />);

    // Signed out by default
    expect(el.find({href: "#/" })).to.have.length(1);
    expect(el.find({href: "#/account/signout" })).to.have.length(0);

    newLoginSession('x', 'y', 'z', 'a', 'b');

    // Should now be signed in
    expect(el.find({href: "#/" })).to.have.length(0);
    expect(el.find({href: "#/account/signout" })).to.have.length(1);

    logout();

    // and signed back out
    expect(el.find({href: "#/" })).to.have.length(1);
    expect(el.find({href: "#/account/signout" })).to.have.length(0);
  });
});
