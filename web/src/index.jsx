import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import { SignUpForm, VerifySignUp } from "./SignUpForm";
import SignInForm from "./SignInForm";
import SignOut from "./SignOut";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AddPlaceForm from "./AddPlaceForm";
import PlaceList from "./PlaceList";
import Nav from "./Nav";

require("../node_modules/uswds/dist/css/uswds.min.css");
require("../node_modules/uswds/dist/js/uswds.min.js");
require("../index.html");

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/dashboard/places" component={PlaceList} />
    <Route path="/dashboard/places/new" component={AddPlaceForm} />
    <Route path="/account/signup" component={SignUpForm} />
    <Route path="/account/signup/verify" component={VerifySignUp} />
    <Route path="/account/signin" component={SignInForm} />
    <Route path="/account/signout" component={SignOut} />
  </Router>,
  document.getElementById("app")
);

ReactDOM.render(<Nav />, document.getElementById("app-nav"));
