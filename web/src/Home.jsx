import React from "react";
import { isLoggedIn, loggedInUser, apiCreds } from "./session";

export default React.createClass({
  render() {
    if (isLoggedIn()) {
      let user = loggedInUser();
      return <h1>Hello, {user.name ? user.name : user.email}</h1>;
    } else {
      return <h1>App home/dashboard goes here</h1>;
    }
  }
});
