import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import SignOut from "./SignOut";
import Home from "./Home";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/account/signup" component={SignUpForm} />
    <Route path="/account/signin" component={SignInForm} />
    <Route path="/account/signout" component={SignOut} />
  </Router>,
  document.getElementById("app")
);
