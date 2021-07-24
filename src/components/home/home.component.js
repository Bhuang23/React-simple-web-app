import React, {Component} from "react";
import "./home.css"
import {Link} from "react-router-dom";
export default class homecomponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        localStorage.setItem("username", "");
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "false");
        this.props.resethandler();
    }

    render() {
        return(
            <div className="home">
                <div className="homeblock">
                    <div>
                        <div className="homeblocktext">
                            <div className="hometitle">Welcome to ShoppingFirst!</div>
                            <div className="homedescription">ShoppingFirst is a light-weight simple ecommerce platform</div>
                        </div>
                        <div className="buttons">
                            <Link to={'/login-component'} style={{textDecoration: 'none'}} className="loginbutton">
                                <span>&nbsp;&nbsp; Login &nbsp;&nbsp;</span>
                            </Link>
                            <span>&nbsp;</span>
                            <Link to={'/createuser-component'} style={{textDecoration: 'none'}} className="signupbutton">
                                <span>&nbsp;&nbsp;Sign up now &nbsp;&nbsp;</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    copyright @2020
                </footer>
            </div>
        );
    }
}

