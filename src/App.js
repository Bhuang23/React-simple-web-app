import "bootstrap/dist/css/bootstrap.css";
import React, {Component} from "react";
import Home from './components/home.component';
import Logincomponent from './components/login.component';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Createusercomponent from "./components/createuser.component";
import ShopDetailcomponent from "./components/ShopDetail.component";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn')};
        this.loginhandler = this.loginhandler.bind(this);
        console.log(this.state)
    }

    componentDidMount() {
        this.setState({isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn')});
    }
    loginhandler()
    {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("isloggingIn", "false");
        this.setState({isLoggingIn: "false", isLoggedIn: "true"});
    }
    login = () => {
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "true");
        this.setState({isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn') });
        console.log(this.state)

    }
    logout = () => {
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("isloggingIn", "false");
        this.setState({isLoggingIn: localStorage.getItem('isloggingIn'), isLoggedIn: localStorage.getItem('loggedIn') });
        console.log(this.state)
    }

render() {
        const {isLoggingIn, isLoggedIn} = this.state;
        return (<Router>
                <div>
                    <Navbar className="app" variant="dark">
                        <Navbar.Brand href='/'> ShopFirst Ecommerce App </Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav>
                                {isLoggedIn==="false" && isLoggingIn==="false" && <Link to={'/login-component'} onClick={this.login} className="nav-link">Login</Link>}
                            </Nav>
                            <Nav>
                                {isLoggedIn==="false" && isLoggingIn==="false" && <Link to={'/createuser-component'} className="nav-link">
                                    Sign up</Link>}
                            </Nav>
                            <Nav>
                                {isLoggedIn==="true" && isLoggingIn==="false" && <Link to={'/'} onClick={this.logout} className="nav-link">Logout</Link>}
                            </Nav>
                        </Nav>
                    </Navbar>
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login-component" render={props => <Logincomponent loginhandler={this.loginhandler}/>}/>
                        <Route path="/createuser-component" component={Createusercomponent}/>
                        <Route path="/ShopDetail" component={ShopDetailcomponent}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}