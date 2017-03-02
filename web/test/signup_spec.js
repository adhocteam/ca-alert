import "./spec_helper";
import React from "react";
import { hashHistory } from "react-router";
import { shallow } from "enzyme";
import sinon from "sinon";
import "whatwg-fetch";

import SignUpForm from "../src/SignUpForm";

describe("Sign-up form", () => {
  beforeEach(() => {
    sinon.stub(global, "fetch");
  });

  afterEach(() => {
    global.fetch.restore();
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

  it("Should display validation for specific elements on blur", () => {
    // Password fields shouldn't get an error if they haven't typed anything
    const el = shallow(<SignUpForm />);
    el.find('input[name="signup-email"]').simulate('change', {
      target: { name: 'signup-email', value: 'someone@example.com' }
    }).simulate('blur');

    expect(el.find('.usa-input-error-message')).to.have.length(0);

    // blurring the password field should show a warning
    el.find('input[name="signup-password"]').simulate('blur');
    expect(el.find('.usa-input-error-message')).to.have.length(1);
  });

  describe("submitting form to server", () => {
    beforeEach(() => {
      const res = new window.Response(`{"status": "success"}`);
      global.fetch.returns(Promise.resolve(res));
    });

    it("should submit successfully", (done) => {
      hashHistory.push = (path) => {
        expect(path).to.contain("/account/signup/verify");
        done();
      }

      const wrapper = shallow(<SignUpForm />);
      wrapper.setState({
        email: { value: "paulsmith@pobox.com" },
        password: { value: "asdf1234" },
        passwordConfirm: { value: "asdf1234" }
      });

      wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    });
  });
});
