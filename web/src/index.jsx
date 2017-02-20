import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import SignUpForm from "./SignUpForm";

ReactDOM.render(
  <Router history={hashHistory}>
     <Route path="/account/signup" component={SignUpForm} />
  </Router>,
  document.getElementById("app")
);
