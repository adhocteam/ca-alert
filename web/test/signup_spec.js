import "./spec_helper";
import React from "react";
import { hashHistory } from "react-router";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import "whatwg-fetch";

import { SignUpForm } from "../src/SignUpForm";

describe("Sign-up form", () => {
  beforeEach(() => {
    sinon.stub(window, "fetch");
    sinon.stub(hashHistory, "push");
  });

  afterEach(() => {
    window.fetch.restore();
    hashHistory.push.restore();
  });

  it("initially should be invalid", () => {
    const wrapper = shallow(<SignUpForm />);
    expect(wrapper.find('input[type="submit"]').props().disabled).to.equal(
      "disabled"
    );
  });

  it("should be valid with valid input", () => {
    const wrapper = shallow(<SignUpForm />);
    const input = [
      { name: "signup-email", value: "paulsmith@pobox.com" },
      { name: "signup-password", value: "asdf1234" },
      { name: "signup-password-confirm", value: "asdf1234" }
    ];
    input.forEach(({ name, value }) => {
      wrapper
        .find(`input[name='${name}']`)
        .simulate("change", { target: { name, value } });
    });
    wrapper.find(`input[name="signup-email"]`).simulate("blur");
    expect(
      wrapper.find('input[type="submit"]').props().disabled
    ).to.be.undefined;
  });

  it("should display error for invalid input on blur", () => {
    const wrapper = shallow(<SignUpForm />);
    wrapper
      .find(`input[name="signup-email"]`)
      .simulate("change", {
        target: { name: "signup-email", value: "garbage" }
      })
      .simulate("blur");
    expect(
      wrapper.contains(
        <span className="usa-input-error-message" role="alert">
          Please supply a valid email address.
        </span>
      )
    ).to.equal(true);
  });

  describe("submitting form to server", () => {
    beforeEach(() => {
      const res = new window.Response(`{status: "success"}`);
      window.fetch.returns(Promise.resolve(res));
    });

    it("should submit successfully", done => {
      const wrapper = shallow(<SignUpForm />);
      wrapper.setState({
        email: { value: "paulsmith@pobox.com" },
        password: { value: "asdf1234" },
        passwordConfirm: { value: "asdf1234" }
      });
      wrapper.simulate("submit");
      done();
      expect(
        hashHistory.push.withArgs("/account/signup/verify").calledOnce
      ).to.equal(true);
    });
  });
});
