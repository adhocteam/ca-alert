import { login } from "./spec_helper";

import React from "react";
import { shallow } from "enzyme";

import Nav from "../src/Nav";

describe("Nav Component", () => {
  it("Should show a non-logged in version by default", () => {
    const el = shallow(<Nav />);

    const signin = el.find({ href: "#/account/signin" });
    expect(signin.length).to.equal(1);
    expect(signin.text()).to.contain("Sign in");
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
});
