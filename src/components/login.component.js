import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import services from '../services/services'
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
    }

    onChangeusername(e) {
        this.setState({errormessage: ''});
        var err = ''
        if(e.target.value=='')
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
        if(e.target.value=='')
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
        var err = ''
        e.preventDefault()
        const userdata = {
            username: this.state.username,
            password: this.state.password,
        };
        (async()=>{
            let response = await services.userlogin(userdata)
            console.log(response)
            this.setState({errormessage: response});
            this.setState({username: '', password: ''})
        })();
    }
    error()
    {
        if (this.state.errormessage == "Successfully authenticated user") {
            return (<span style={{color: 'green'}}>{this.state.errormessage}</span>);
        }
        else{
            return (<span style={{color:'red'}}>{this.state.errormessage}</span>);
        }
    }
    render() {
        return(
                <div className="col-md-13 col-md-offset-2" style={{justifyContent: 'center'}}>
                    <Form onSubmit={this.onSubmit}  className="formWidth">
                        <Form.Group controlId="Username">
                            <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Username</Form.Label>
                            <Form.Control type="text" value={this.state.username} onChange={this.onChangeusername}/>
                            {this.state.usernameerrormessage.length > 0 &&
                            <span style={{color:'red'}}>{this.state.usernameerrormessage}</span>}
                        </Form.Group>
                        <Form.Group controlId="Password">
                            <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Password</Form.Label>
                            <Form.Control type="text" value={this.state.password} onChange={this.onChangepassword}/>
                            {this.state.passworderrormessage.length > 0 &&
                            <span style={{color:'red'}}>{this.state.passworderrormessage}</span>}
                        </Form.Group>
                        <Button variant="danger" size="lg" block="block" type="submit"> Login </Button>
                    </Form>
                    {this.error()}
                </div>
        );
    }
};

