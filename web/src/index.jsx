import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import { SignUpForm, VerifySignUp } from "./SignUpForm";
import SignInForm from "./SignInForm";
import SignOut from "./SignOut";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AddPlaceForm from "./AddPlaceForm";
import EditPlaceForm from "./EditPlaceForm";
import PlaceList from "./PlaceList";
import Nav from "./Nav";
import HazardList from "./HazardList";
import CreateHazard from "./CreateHazard";
import UserList from "./UserList";
import HazardView from "./HazardView";
import CommunicationSettings from "./CommunicationSettings";
import AddPhone from "./AddPhone";
import ConfirmPhone from "./ConfirmPhone";
import AlertList from './AlertList';
import Analytics from './Analytics';

require("../node_modules/uswds/dist/css/uswds.min.css");
require("../node_modules/uswds/dist/js/uswds.min.js");
require("../index.html");

import "./App.scss";

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Home} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/dashboard/alerts" component={AlertList} />
    <Route path="/dashboard/places" component={PlaceList} />
    <Route path="/dashboard/places/new" component={AddPlaceForm} />
    <Route path="/dashboard/places/:id/edit" component={EditPlaceForm} />
    <Route path="/account/signup" component={SignUpForm} />
    <Route path="/account/signup/verify" component={VerifySignUp} />
    <Route path="/account/signin" component={SignInForm} />
    <Route path="/account/signout" component={SignOut} />
    <Route path="/account/communication" component={CommunicationSettings} />
    <Route path="/account/communication/add-phone" component={AddPhone} />
    <Route path="/account/communication/phone/:id" component={ConfirmPhone} />
    <Route path="/admin/hazards" component={HazardList} />
    <Route path="/admin/hazards/new" component={CreateHazard} />
    <Route path="/admin/hazards/:id" component={HazardView} />
    <Route path="/admin/users" component={UserList} />
    <Route path="/admin/analytics" component={Analytics} />
  </Router>,
  document.getElementById("app")
);

ReactDOM.render(<Nav />, document.getElementById("app-nav"));
