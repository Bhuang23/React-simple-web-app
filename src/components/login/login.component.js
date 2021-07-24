import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import services from '../../services/services'
import {Link, Redirect} from "react-router-dom";
import "./login.css"

export default class Logincomponent extends Component {
    constructor(props) {
        super(props)
        this.props.login();
        let username = localStorage.getItem("username")
        if(username)
        {
            this.props.logouthandler();
        }
        // Setting up functions
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // Setting up state
        this.state = {
            username: '',
            password: '',
            passworderrormessage:'',
            usernameerrormessage: '',
            errormessage:''
        }
        this.userdata = {
            username: '',
            password: ''
        };
    }
    onChangeusername(e) {
        if(e.target.value==='')
        {
            let err = 'Username is required'
            this.setState({usernameerrormessage: err, username:e.target.value});
        }
        else
        {
            this.setState({usernameerrormessage: '', username: e.target.value});
        }
    }

    onChangepassword(e) {
        if(e.target.value==='')
        {
            let err = 'Password is required'
            this.setState({passworderrormessage: err, password: e.target.value})
        }
        else
        {
            this.setState({passworderrormessage:'', password: e.target.value})
        }
    }
    onSubmit(e) {
        e.preventDefault()
        this.userdata = {
            username: this.state.username,
            password: this.state.password,
        };
        services.userlogin(this.userdata).then(res => {
                    this.setState({errormessage: res, username:'', password:''});
        })
    }
    error()
    {
        if (this.state.errormessage === "Successfully authenticated user") {
            // store the user in localStorage
            localStorage.setItem('username', this.userdata.username)
            this.props.loginhandler();
            return (<Redirect from="/login-component" push to={{pathname: '/shopdetail-component', state: this.state}}/>);

        }
        else{
            return (<span className="error">{this.state.errormessage}</span>);
        }
    }
    render() {
        return (
            <div className="loginmain">
                <Form onSubmit={this.onSubmit} className="formWidth">
                    <Form.Group className="group" controlId="Username">
                        <Form.Label className="text">Username</Form.Label>
                        <Form.Control type="text" value={this.state.username} onChange={this.onChangeusername}/>
                        {this.state.usernameerrormessage.length > 0 &&
                        <span className="span">{this.state.usernameerrormessage}</span>}
                    </Form.Group>
                    <Form.Group className="group" controlId="Password">
                        <Form.Label className="text">Password</Form.Label>
                        <Form.Control type="text" value={this.state.password} onChange={this.onChangepassword}/>
                        {this.state.passworderrormessage.length > 0 &&
                        <span className="span">{this.state.passworderrormessage}</span>}
                    </Form.Group>
                    <button className="login" type="submit"> Login </button>
                    <div>
                        {this.error()}
                        <div>
                            <Link to={'/resetpassword-component'} style={{textDecoration: 'none'}} className="resetpassword">
                                <span>Forgot your password?</span>
                            </Link>
                        </div>
                        <br/>
                        <div>
                            <span className="newaccount">Don't have an account?</span>
                        </div>
                        <div>
                            <Link to={'/createuser-component'} style={{textDecoration: 'none'}} className="join">
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;Join now!&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
};

