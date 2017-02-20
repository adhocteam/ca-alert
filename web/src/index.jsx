import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import SignUpForm from "./SignUpForm";
import Home from "./Home";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/account/signup" component={SignUpForm} />
  </Router>,
  document.getElementById("app")
);
