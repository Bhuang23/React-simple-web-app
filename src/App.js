import "bootstrap/dist/css/bootstrap.css";
import React, {Component} from "react";
import Home from './components/home/home.component';
import Logincomponent from './components/login/login.component';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Createusercomponent from "./components/signup/createuser.component";
import ShopDetailcomponent from "./components/ShopDetail/ShopDetail.component";
import ShoppingCartcomponent from "./components/ShoppingCart/ShoppingCart.component";
import Profilecomponent from "./components/profile/profile.component";
import Errorcomponent from "./components/error/error.component"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isSigningUp: localStorage.getItem('isSigningUp'), isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn')};
        this.loginhandler = this.loginhandler.bind(this);
        this.logouthandler = this.logouthandler.bind(this);
        this.resethandler = this.resethandler.bind(this);
        console.log(this.state)
    }

    componentDidMount() {
        this.setState({isSigningUp: localStorage.getItem('isSigningUp'), isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn')});
    }
    resethandler()
    {
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "false");
        localStorage.setItem("isSigningUp", "false");
        this.setState({isSigningUp: localStorage.getItem('isSigningUp'), isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn')});
    }
    loginhandler()
    {
        localStorage.setItem("isSigningUp", "false");
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("isloggingIn", "false");
        this.setState({isLoggingIn: "false", isLoggedIn: "true"});
    }
    logouthandler()
    {
        localStorage.setItem("isSigningUp", "false");
        localStorage.setItem("username", "");
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "true");
        this.setState({isLoggingIn: "true", isLoggedIn: "false"});
    }
    login = () => {
        localStorage.setItem("isSigningUp", "false");
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "true");
        this.setState({isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn') });
        console.log(this.state)

    }
    signup = () => {
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "false");
        localStorage.setItem("isSigningUp", "true");
        localStorage.setItem("username", "");
        this.setState({isSigningUp: localStorage.getItem('isSigningUp'), isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn') });
        console.log(this.state)
    }
    logout = () => {
        localStorage.setItem("isSigningUp", "false");
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "false");
        localStorage.setItem("username", "");
        this.setState({isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn') });
        console.log(this.state)
    }

render() {
        const {isSigningUp, isLoggingIn, isLoggedIn} = this.state;
        return (<Router className="background">
                <div className="background">
                    <Navbar className="app" variant="dark">
                        <Navbar.Brand href='/'>
                            <ShoppingCartIcon />
                            &nbsp;ShoppingFirst</Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav>
                                {isLoggedIn==="false" && isLoggingIn==="false" && isSigningUp==="false" && <Link to={'/aboutus-component'} className="nav-link">About us</Link>}
                            </Nav>
                            <Nav>
                                {isLoggedIn==="true" && isLoggingIn==="false" && <Link to={'/shopdetail-component'} className="nav-link">Shop</Link>}
                            </Nav>
                            <Nav>
                                {isLoggedIn==="true" && isLoggingIn==="false" && <Link to={'/shoppingcart-component'} className="nav-link">Shopping Cart</Link>}
                            </Nav>
                            <Nav>
                                {isLoggedIn==="true" && isLoggingIn==="false" && <Link to={'/profile-component'} className="nav-link">Profile</Link>}
                            </Nav>
                            <Nav>
                                {isLoggedIn==="true" && isLoggingIn==="false" && <Link to={'/'} onClick={this.logout} className="nav-link">Logout</Link>}
                            </Nav>
                        </Nav>
                    </Navbar>
                    <Switch>
                        <Route exact path="/" render={(props) => <Home resethandler={this.resethandler}/>}/>
                        <Route path="/login-component" render={(props) => <Logincomponent loginhandler={this.loginhandler} logouthandler={this.logouthandler} login={this.login}/>}/>
                        <Route path="/createuser-component" render={(props) => <Createusercomponent signup={this.signup}/>}/>
                        <Route path="/shopdetail-component" component={ShopDetailcomponent}/>
                        <Route path="/shoppingcart-component" component={ShoppingCartcomponent}/>
                        <Route path="/profile-component" component={Profilecomponent}/>
                        <Route path="/error-component" component={Errorcomponent}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}