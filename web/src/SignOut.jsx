import React from "react";
import { hashHistory } from "react-router";
import { logout } from "./session";

export default class SignOut extends React.Component {
    componentDidMount() {
        logout();
        hashHistory.push("/");
    }

    render() {return null;}
}
