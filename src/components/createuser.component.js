import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import services from '../services/services';
import {Dropdown} from "react-dropdown-now";
import Select from "react-select";
import "./signup.css"
export default class Createusercomponent extends Component {
    constructor(props) {
        super(props)
        this.country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
        this.state_list = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
        // Setting up functions
        this.onChangeusername = this.onChangeusername.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangephone = this.onChangephone.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.handleSelectstate = this.handleSelectstate.bind(this);
        this.handleSelectcountry = this.handleSelectcountry.bind(this);
        this.onChangezipcode = this.onChangezipcode.bind(this);
        // Setting up state
        this.state = {
            username: '',
            password: '',
            email: '',
            phone: '',
            address: '',
            State: null,
            country: null,
            zipcode: '',
            usernameerrormessage: '',
            passworderrormessage:'',
            emailerrormessage: '',
            phoneerrormessage: '',
            addresserrormessage: '',
            stateerrormessage: '',
            countryerrormessage: '',
            zipcodeerrormessage: '',
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
    onChangephone(e) {
        this.setState({errormessage: ''});
        var err = ''
        if(e.target.value==='')
        {
            err = 'Phone is required'
            this.setState({phoneerrormessage: err});
            this.setState({phone: e.target.value})
        }
        else
        {
            this.setState({phoneerrormessage: err});
            this.setState({phone: e.target.value})
        }
    }
    onChangeaddress(e) {
        this.setState({errormessage: ''});
        var err = ''
        if(e.target.value==='')
        {
            err = 'Address is required'
            this.setState({addresserrormessage: err});
            this.setState({address: e.target.value})
        }
        else
        {
            this.setState({addresserrormessage: err});
            this.setState({address: e.target.value})
        }
    }

    handleSelectstate(value){
        this.setState({State: value, stateerrormessage: ''})
    };
    handleSelectcountry(value){
        this.setState({country: value, countryerrormessage: ''})
    };
    onChangezipcode(e) {
        this.setState({errormessage: ''});
        var err = ''
        if(e.target.value==='')
        {
            err = 'Zipcode is required'
            this.setState({zipcodeerrormessage: err});
            this.setState({zipcode: e.target.value})
        }
        else
        {
            this.setState({zipcodeerrormessage: err});
            this.setState({zipcode: e.target.value})
        }
    }
    checkallinput() {
        let check = true;
        if (this.state.username === '') {
            this.setState({usernameerrormessage: 'Username is required'});
            check = false;
        }
        if (this.state.password === '') {
            this.setState({passworderrormessage: 'Password is required'});
            check = false;
        }
        if (this.state.email === '') {
            this.setState({emailerrormessage: 'Email is required'});
            check = false;
        }
        if (this.state.phone === '') {
            this.setState({phoneerrormessage: 'Phone is required'});
            check = false;
        }
        if (this.state.address === '') {
            this.setState({addresserrormessage: 'Address is required'});
            check = false;
        }
        if (this.state.State === null) {
            if (this.state.country.value === 'United States of America') {
                this.setState({stateerrormessage: 'State is required'});
                check = false;
            }
        }
        if (this.state.country === null) {
            this.setState({countryerrormessage: 'Country is required'});
            check = false;
        }
        if (this.state.zipcode === '') {
            this.setState({zipcodeerrormessage: 'Zipcode is required'});
            check = false;
        }
        if (this.state.country.value !== "United States of America" && this.state.State !==null)
        {
            console.log(this.state.country.value)
            this.setState({countryerrormessage: 'Country can not have US states'});
            check = false;
        }
        return check;
    }
    onSubmit(e) {
        e.preventDefault()
        if(this.checkallinput()===true) {
            const userdata = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phonenumber: this.state.phone,
                address: this.state.address,
                state: this.state.State.value,
                country: this.state.country.value,
                zipcode: this.state.zipcode,
            };
            (async () => {
                let response = await services.createuser(userdata)
                console.log(response)
                this.setState({errormessage: response});
                this.setState({
                    username: '',
                    password: '',
                    email: '',
                    phone: '',
                    address: '',
                    State: null,
                    country: null,
                    zipcode: ''
                })
            })();
        }
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
                <Form onSubmit={this.onSubmit}>
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
                    <Form.Group controlId="Phone">
                        <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Phone</Form.Label>
                        <Form.Control type="text" value={this.state.phone} onChange={this.onChangephone}/>
                        {this.state.phoneerrormessage.length > 0 &&
                        <span className="span">{this.state.phoneerrormessage}</span>}
                    </Form.Group>
                    <Form.Group controlId="Address">
                        <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Address</Form.Label>
                        <Form.Control type="text" value={this.state.address} onChange={this.onChangeaddress}/>
                        {this.state.addresserrormessage.length > 0 &&
                        <span className="span">{this.state.addresserrormessage}</span>}
                    </Form.Group>
                    <Form.Group controlId="state">
                        <Select value={this.state.State} placeholder="Select a State" onChange={this.handleSelectstate} options={this.state_list.map(t=>({value: t, label: t}))} name="states"/>
                        {this.state.stateerrormessage.length > 0 &&
                        <span className="span">{this.state.stateerrormessage}</span>}
                    </Form.Group>
                    <Form.Group controlId="country">
                        <Select value={this.state.country} placeholder="Select a Country" onChange={this.handleSelectcountry} options={this.country_list.map(t=>({value: t, label: t}))} name="countries"/>
                        {this.state.countryerrormessage.length > 0 &&
                        <span className="span">{this.state.countryerrormessage}</span>}
                    </Form.Group>
                    <Form.Group controlId="Zipcode">
                        <Form.Label style={{display: 'flex', justifyContent: 'center'}}>Zipcode</Form.Label>
                        <Form.Control type="text" value={this.state.zipcode} onChange={this.onChangezipcode}/>
                        {this.state.zipcodeerrormessage.length > 0 &&
                        <span className="span">{this.state.zipcodeerrormessage}</span>}
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