import "bootstrap/dist/css/bootstrap.css";
import React, {Component, useEffect, useState} from "react";
import Home from './components/home.component';
import Logincomponent from './components/login.component';
import Logoutcomponent from './components/logout.component';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Createusercomponent from "./components/createuser.component";
import ShopDetailcomponent from "./components/ShopDetail.component";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default class App extends Component{
    constructor(props) {
        super(props);
        if(Boolean(localStorage.getItem('loggedin')))
        {
            console.log(localStorage.getItem('loggedin'))
            this.state = {isLoggingIn: false, isLoggedIn: localStorage.getItem('loggedin') };
        }
        else
        {
            this.state = {isLoggingIn: false, isLoggedIn: false };
        }

        console.log(this.state)
    }

    login = () => {
        this.setState({isLoggingIn:true, isLoggedIn : false});
        console.log(this.state)

    }

    logout = () => {
        this.setState({ isLoggingIn:false, isLoggedIn: false });
        console.log(this.state)
    }

render() {
        const {isLoggingIn, isLoggedIn} = this.state;
        return (<Router>
                <div className="app">
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand href='/'> ShopFirst Ecommerce App </Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav>
                                {!isLoggedIn && !isLoggingIn && <Link to={'/login-component'} onClick={this.login} className="nav-link">Login</Link>}
                            </Nav>
                            <Nav>
                                <Link to={'/createuser-component'} className="nav-link">
                                    Sign up</Link>
                            </Nav>
                            <Nav>
                                {isLoggedIn && !isLoggingIn && <Link to={'/'} onClick={this.logout} className="nav-link">Logout</Link>}
                            </Nav>
                        </Nav>
                    </Navbar>
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login-component" component={Logincomponent}/>
                        <Route path="/createuser-component" component={Createusercomponent}/>
                        <Route path="/ShopDetail" component={ShopDetailcomponent}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}