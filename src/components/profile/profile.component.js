import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import services from '../../services/services';
import Select from "react-select";
import "../profile/profile.css"
import {Redirect} from "react-router-dom";
export default class Profilecomponent extends Component {
    constructor(props) {
        super(props)
        this.username = localStorage.getItem('username')
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
        this.checkusername = this.checkusername.bind(this);
        this.checkemail = this.checkemail.bind(this);
        // Setting up state
        this.state = {
            _id: '',
            username: '',
            preusername:'',
            password: '',
            preemail:'',
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
        if(this.username!=="")
        {
            this.loadData(this.username);
            console.log(this.state)
        }
        console.log(this.state)
    }
    loadData(username)
    {
            (async () => {
                let response = await services.getuser({username: username})
                console.log(response)
                console.log(response[0]._id)
                console.log(response[0].state)
                this.setState({
                    _id: response[0]._id,
                    username: response[0].username,
                    preusername: response[0].username,
                    password: response[0].password,
                    email: response[0].email,
                    preemail:response[0].email,
                    phone: response[0].phonenumber,
                    address: response[0].address,
                    State: {label: response[0].state, value: response[0].state},
                    country: {label: response[0].country, value: response[0].country},
                    zipcode: response[0].zipcode
                })
                console.log(username)
                console.log(this.state)
            })();
    }
    reloadData(userdata) {
        (async () => {
            let response = await services.updateuser(userdata)
            console.log(response)
            this.setState({
                _id: response._id,
                username: response.username,
                preusername: response.username,
                password: response.password,
                email: response.email,
                preemail:response.email,
                phone: response.phonenumber,
                address: response.address,
                State: {label: response.state, value: response.state},
                country: {label: response.country, value: response.country},
                zipcode: response.zipcode
            })
            this.setState({errormessage: "Successfully updated user"});
            if(this.state.username !== localStorage.getItem("username"))
            {
                localStorage.setItem("username", this.state.username);
            }
        })();
    }
    async checkusername(preusername, username) {
        if (preusername === username) {
            this.setState({usernameerrormessage: ''});
            this.setState({username: username})
            return false;
        } else {
            let response = await services.getuser({username: username});
            console.log(response)
            if (response[0]) {
                return true;
            } else {
                this.setState({usernameerrormessage: ''});
                this.setState({username: username})
                return false;
            }
        }
    }
    async checkemail(preemail, email) {
        if (preemail === email) {
            this.setState({emailerrormessage: ''});
            this.setState({email: email});
            return false;
        }
        else
        {
            let response = await services.getemail({email: email})
            console.log(response)
            if (response) {
                return true;
            } else {
                this.setState({emailerrormessage: ''});
                this.setState({email: email});
                return false;
            }
        }
    }
    onChangeusername(e) {
        this.setState({errormessage: ''});
        let err = '';
        if(e.target.value==='')
        {
            err = 'Username is required'
            this.setState({usernameerrormessage: err});
            this.setState({username: e.target.value})
        }
        else
        {
            this.setState({usernameerrormessage: ''});
            this.setState({username: e.target.value});
        }
    }

    onChangepassword(e) {
        this.setState({errormessage: ''});
        let err = '';
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
        let err = '';
        if(e.target.value==='')
        {
            err = 'Email is required'
            this.setState({emailerrormessage: err});
            this.setState({email: e.target.value})
        }
        else
        {
            this.setState({usernameerrormessage: ''});
            this.setState({email: e.target.value});
        }
    }
    onChangephone(e) {
        this.setState({errormessage: ''});
        let err = '';
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
        let err = '';
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
        let err = '';
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
    async checkallinput() {
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
            if (this.state.country !== null) {
                if (this.state.country.value === 'United States of America') {
                    this.setState({stateerrormessage: 'State is required'});
                    check = false;
                }
            } else {
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
        if (this.state.country !== null) {
            console.log(this.state.country);
            if (this.state.country.value !== "United States of America" && this.state.State !== null) {
                console.log(this.state.country.value)
                this.setState({countryerrormessage: 'Country can not have US states'});
                check = false;
            }
        }
        if (await this.checkusername(this.state.preusername, this.state.username) === true) {
            console.log("username already used");
            let err = 'This username is already in use';
            this.setState({usernameerrormessage: err});
            this.setState({username: this.state.preusername})
            check = false;
        }
        if (await this.checkemail(this.state.preemail, this.state.email) === true) {
            console.log("email already used");
            let err = 'This email is already in use';
            this.setState({emailerrormessage: err});
            this.setState({email: this.state.preemail})
            check = false;
        }
        return check;
    }
    async onSubmit(e) {
        e.preventDefault()
        if (await this.checkallinput() === true) {
            const userdata = {
                _id: this.state._id,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                phonenumber: this.state.phone,
                address: this.state.address,
                state: this.state.State.value,
                country: this.state.country.value,
                zipcode: this.state.zipcode,
            };
            console.log(userdata)
            this.reloadData(userdata);
        } else {
            this.setState({errormessage: "Unable to update user"});
        }
    }
    error() {
        if (this.state.errormessage === "Successfully updated user") {
            return (<div className="success">{this.state.errormessage}</div>);
        }
        else{
            return (<div className="error">{this.state.errormessage}</div>);
        }
    }
    render() {
        const username = this.username;
        if(username!=="" && username)
        {
            return (
                <div className="profilemain">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group className="text" controlId="Username" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={this.state.username} onChange={this.onChangeusername}/>
                            {this.state.usernameerrormessage.length > 0 &&
                            <div className="span">{this.state.usernameerrormessage}</div>}
                        </Form.Group>
                        <Form.Group className="text" controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={this.state.email} onChange={this.onChangeemail}/>
                            {this.state.emailerrormessage.length > 0 &&
                            <div className="span">{this.state.emailerrormessage}</div>}
                        </Form.Group>
                        <Form.Group className="text" controlId="Password">
                            <Form.Label >Password</Form.Label>
                            <Form.Control type="text" value={this.state.password} onChange={this.onChangepassword}/>
                            {this.state.passworderrormessage.length > 0 &&
                            <div className="span">{this.state.passworderrormessage}</div>}
                        </Form.Group>
                        <Form.Group className="text" controlId="Phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" value={this.state.phone} onChange={this.onChangephone}/>
                            {this.state.phoneerrormessage.length > 0 &&
                            <div className="span">{this.state.phoneerrormessage}</div>}
                        </Form.Group>
                        <Form.Group className="text" controlId="Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" value={this.state.address} onChange={this.onChangeaddress}/>
                            {this.state.addresserrormessage.length > 0 &&
                            <div className="span">{this.state.addresserrormessage}</div>}
                        </Form.Group>
                        <Form.Group controlId="state">
                            <Select value={this.state.State} placeholder="Select a State" onChange={this.handleSelectstate} options={this.state_list.map(t=>({value: t, label: t}))} name="states"/>
                            {this.state.stateerrormessage.length > 0 &&
                            <div className="span">{this.state.stateerrormessage}</div>}
                        </Form.Group>
                        <Form.Group controlId="country">
                            <Select value={this.state.country} placeholder="Select a Country" onChange={this.handleSelectcountry} options={this.country_list.map(t=>({value: t, label: t}))} name="countries"/>
                            {this.state.countryerrormessage.length > 0 &&
                            <div className="span">{this.state.countryerrormessage}</div>}
                        </Form.Group>
                        <Form.Group className="text" controlId="Zipcode">
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control type="text" value={this.state.zipcode} onChange={this.onChangezipcode}/>
                            {this.state.zipcodeerrormessage.length > 0 &&
                            <div className="span">{this.state.zipcodeerrormessage}</div>}
                        </Form.Group>
                        <button className="profile" type="submit">
                            Submit Changes
                        </button>
                        {this.error()}
                    </Form>
                </div>
            );
        }
        else {
            return(<Redirect from="/profile-component" to={{pathname: '/error-component'}}/>)
        }
}}