import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import services from '../services/services'
import {Redirect} from "react-router-dom";
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
        this.setState({errormessage: ''});
        var err = ''
        if(e.target.value==='')
        {
            err = 'Username is required'
            this.setState({usernameerrormessage: err});
            this.setState({username: e.target.value})
        }
        else
        {
            this.setState({usernameerrormessage: ''});
            this.setState({username: e.target.value})
        }
    }

    onChangepassword(e) {
        this.setState({errormessage: ''});
        var err = ''
        if(e.target.value==='')
        {
            err = 'Password is required'
            this.setState({passworderrormessage: err})
            this.setState({password: e.target.value})
        }
        else
        {
            this.setState({passworderrormessage:''})
            this.setState({password: e.target.value})
        }
    }

    onSubmit(e) {
        e.preventDefault()
        this.userdata = {
            username: this.state.username,
            password: this.state.password,
        };
        (async()=>{
            let response = await services.userlogin(this.userdata)
            console.log(response)
            this.setState({errormessage: response});
            this.setState({username: '', password: ''})
        })();
    }
    error()
    {
        if (this.state.errormessage === "Successfully authenticated user") {
            // store the user in localStorage
            let user = {
                isLoggedIn: true
            }
            localStorage.setItem('loggedin', user.isLoggedIn)
            localStorage.setItem('username', this.userdata.username)
            return (<Redirect to={{pathname: '/ShopDetail', state: this.state}}/>);

        }
        else{
            return (<span style={{color:'red'}}>{this.state.errormessage}</span>);
        }
    }
    render() {
                return (
                    <div className="col-md-13 col-md-offset-2" style={{justifyContent: 'center'}}>
                        <Form onSubmit={this.onSubmit} className="formWidth">
                            <Form.Group controlId="Username">
                                <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Username</Form.Label>
                                <Form.Control type="text" value={this.state.username} onChange={this.onChangeusername}/>
                                {this.state.usernameerrormessage.length > 0 &&
                                <span style={{color: 'red'}}>{this.state.usernameerrormessage}</span>}
                            </Form.Group>
                            <Form.Group controlId="Password">
                                <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Password</Form.Label>
                                <Form.Control type="text" value={this.state.password} onChange={this.onChangepassword}/>
                                {this.state.passworderrormessage.length > 0 &&
                                <span style={{color: 'red'}}>{this.state.passworderrormessage}</span>}
                            </Form.Group>
                            <Button variant="danger" size="lg" block="block" type="submit"> Login </Button>
                        </Form>
                        {this.error()}

                    </div>
                );
            }
};

