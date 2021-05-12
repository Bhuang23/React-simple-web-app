import React, {Component} from "react";
import button from 'react-bootstrap/Button';
import {Redirect, Link} from "react-router-dom";
export default class Logoutcomponent extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
        this.stay = this.stay.bind(this);
    }
    logout() {
        this.props.logout()
    }
    stay() {
    }
    render() {
        return (
            <div>
                Are you sure you want to log out?
                <Link to="/" className='button'>
                    <button onClick={this.logout} className='button' type="button">
                        Yes
                    </button>
                </Link>
                <Link to="/" className='button'>
                    <button onClick={this.stay} className='button' type="button">
                        No
                    </button>
                </Link>
            </div>
        )
    }
};