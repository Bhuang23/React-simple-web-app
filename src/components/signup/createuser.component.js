import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import services from '../../services/services';
import Select from "react-select";
import "./signup.css"
export default class Createusercomponent extends Component {
    constructor(props) {
        super(props)
        this.country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
        this.state_list = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
        // Setting up functions
        this.props.signup();
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
            this.setState({username: e.target.value})
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
            this.setState({emailerrormessage: ''});
            this.setState({email: e.target.value})
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
            if (this.state.country !== null){
                if(this.state.country.value==='United States of America') {
                    this.setState({stateerrormessage: 'State is required'});
                    check = false;
                }
            }
            else
            {
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
        if(this.state.country !== null)
        {
            if (this.state.country.value !== "United States of America" && this.state.State !==null)
            {
                console.log(this.state.country.value)
                this.setState({countryerrormessage: 'Country can not have US states'});
                check = false;
            }
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
        else
        {
            this.setState({errormessage: "Missing required information"});
        }
    }
    error()
    {
        if (this.state.errormessage === "Successfully registered user") {
            return (<div style={{color: 'green'}}>{this.state.errormessage}</div>);
        }
        else{
            return (<div className="error">{this.state.errormessage}</div>);
        }
    }
    render() {
        return (
            <div className="signupmain">
                <Form onSubmit={this.onSubmit} className="col-form-label">
                    <Form.Group controlId="Username" >
                        <Form.Control type="text" placeholder="Username" value={this.state.username} onChange={this.onChangeusername}/>
                        {this.state.usernameerrormessage.length > 0 &&
                        <div className="span">{this.state.usernameerrormessage}</div>}
                    </Form.Group>
                    <Form.Group controlId="Email">
                        <Form.Control type="text" placeholder="Email" value={this.state.email} onChange={this.onChangeemail}/>
                        {this.state.emailerrormessage.length > 0 &&
                        <div className="span">{this.state.emailerrormessage}</div>}
                    </Form.Group>
                    <Form.Group controlId="Password">
                        <Form.Control type="text" placeholder="Password" value={this.state.password} onChange={this.onChangepassword}/>
                        {this.state.passworderrormessage.length > 0 &&
                        <div className="span">{this.state.passworderrormessage}</div>}
                    </Form.Group>
                    <Form.Group controlId="Phone">
                        <Form.Control type="text" placeholder="Phone Number" value={this.state.phone} onChange={this.onChangephone}/>
                        {this.state.phoneerrormessage.length > 0 &&
                        <div className="span">{this.state.phoneerrormessage}</div>}
                    </Form.Group>
                    <Form.Group controlId="Address">
                        <Form.Control type="text" placeholder="Address" value={this.state.address} onChange={this.onChangeaddress}/>
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
                    <Form.Group controlId="Zipcode">
                        <Form.Control type="text" placeholder="Zipcode" value={this.state.zipcode} onChange={this.onChangezipcode}/>
                        {this.state.zipcodeerrormessage.length > 0 &&
                        <div className="span">{this.state.zipcodeerrormessage}</div>}
                    </Form.Group>
                    <button className="signup"  type="submit">
                        Register
                    </button>
                    {this.error()}
                </Form>
            </div>
        );
    }
}