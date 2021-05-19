import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import "./auth.css"
import Button from "react-bootstrap/Button";
export default class authcomponent extends Component {
    constructor(props) {
        super(props);
    }
    auth(){
        if (this.props.location.state.errormessage === "Successfully authenticated user") {
            return(<Button className="button" href='/ShopDetail'> Click here to start shopping!</Button>)
        }
        else{
            return (<Redirect to={{pathname: '/'}}/>);
        }
    }

    render() {
        return(
            <div>{this.auth()}</div>
        );
    }
}

