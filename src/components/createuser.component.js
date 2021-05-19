import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import services from '../services/services';
export default class Createusercomponent extends Component {

    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            username: '',
            password: '',
            email: '',
            usernameerrormessage: '',
            passworderrormessage:'',
            emailerrormessage: '',
            errormessage:''
        }
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
            this.setState({passworderrormessage: err});
            this.setState({password: e.target.value})
        }
        else
        {
            this.setState({passworderrormessage: ''});
            this.setState({password: e.target.value})
        }
    }

    onChangeemail(e) {
        this.setState({errormessage: ''});
        var err = ''
        if(e.target.value==='')
        {
            err = 'Email is required'
            this.setState({emailerrormessage: err});
            this.setState({email: e.target.value})
        }
        else
        {
            this.setState({emailerrormessage: ''});
            this.setState({email: e.target.value})
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const userdata = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
        };
        (async()=>{
            let response = await services.createuser(userdata)
            console.log(response)
            this.setState({errormessage: response});
            this.setState({username: '', password: '', email: ''})
        })();
    }
    error()
    {
        if (this.state.errormessage === "Successfully registered user") {
            return (<span style={{color: 'green'}}>{this.state.errormessage}</span>);
        }
        else{
            return (<span className="span">{this.state.errormessage}</span>);
        }
    }
    render() {
        return (
            <div className="div">
                <Form onSubmit={this.onSubmit} className="formWidth">
                    <Form.Group controlId="Username" >
                        <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Username</Form.Label>
                        <Form.Control type="text" value={this.state.username} onChange={this.onChangeusername}/>
                        {this.state.usernameerrormessage.length > 0 &&
                        <span className="span">{this.state.usernameerrormessage}</span>}
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Email</Form.Label>
                        <Form.Control type="text" value={this.state.email} onChange={this.onChangeemail}/>
                        {this.state.emailerrormessage.length > 0 &&
                        <span className="span">{this.state.emailerrormessage}</span>}
                    </Form.Group>

                    <Form.Group controlId="Password">
                        <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Password</Form.Label>
                        <Form.Control type="text" value={this.state.password} onChange={this.onChangepassword}/>
                        {this.state.passworderrormessage.length > 0 &&
                        <span className="span">{this.state.passworderrormessage}</span>}
                    </Form.Group>

                    <Button variant="danger" size="lg" block="block" type="submit">
                        Register
                    </Button>
                    {this.error()}
                </Form>
            </div>
        );
    }
}