import React, {Component} from "react";
import "./error.css"
import {Link} from "react-router-dom";
export default class ErrorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "false");
    }

    render() {
        return(
            <div className="errormain">
                <div className="errortext">
                    <h3>Oops your not allowed to be here! :(</h3>
                    <div className="container">
                        <Link to={'/'} style={{textDecoration: 'none'}} className="gotohome">
                            <span >Go back to home page</span>
                        </Link>
                        <Link to={'/login-component'} style={{textDecoration: 'none'}} className="gotologin">
                            <span>Go to login </span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
