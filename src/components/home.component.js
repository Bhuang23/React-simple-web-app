import React, {Component} from "react";
export default class homecomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "false");
    }

    render() {
        return(
            <div>Welcome to ShoppingFirst!</div>
        );
    }
}

