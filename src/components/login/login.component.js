import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import services from '../../services/services'
import {Redirect} from "react-router-dom";
import "./login.css"
import Button from "react-bootstrap/Button";
export default class Logincomponent extends Component {
    constructor(props) {
        super(props)

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
            return (<Redirect from="/login-component" to={{pathname: '/shopdetail-component', state: this.state}}/>);

        }
        else{
            return (<span className="span">{this.state.errormessage}</span>);
        }
    }
    render() {
        return (
            <div className="div">
                <Form onSubmit={this.onSubmit} className="formWidth">
                    <Form.Group className="group" controlId="Username">
                        <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Username</Form.Label>
                        <Form.Control type="text" value={this.state.username} onChange={this.onChangeusername}/>
                        {this.state.usernameerrormessage.length > 0 &&
                        <span className="span">{this.state.usernameerrormessage}</span>}
                    </Form.Group>
                    <Form.Group className="group" controlId="Password">
                        <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Password</Form.Label>
                        <Form.Control type="text" value={this.state.password} onChange={this.onChangepassword}/>
                        {this.state.passworderrormessage.length > 0 &&
                        <span className="span">{this.state.passworderrormessage}</span>}
                    </Form.Group>
                    <button className="login" variant="danger" size="lg" block="block" type="submit"> Login </button>
                </Form>
                {this.error()}

            </div>
        );
    }
};

