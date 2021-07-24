
import services from "../../services/services";
import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import 'react-dropdown-now/style.css';
import './ShoppingCart.css'
import {Dialog, DialogContent, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cardform from './Cardform.js';
import {Redirect} from "react-router-dom";
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const successMessage = () => {
    return (
        <div className="success-msg">
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
            <div className="title">Payment Successful!</div>
        </div>
    )
}
const ShoppingCartComponent = () => {
    let username = localStorage.getItem('username')
    const [loadingData, setLoadingData] = useState(true);
    let [message, setMessage] = useState("")
    let [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    let [total, setTotal] = useState(0);
    let [cartlength, setcartlength] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        getData();
        setPaymentCompleted(false);
        setOpen(false);
    };
    const onAdd = (e) => {
        console.log(e.target.value);
        addItem(e.target.value);
    }
    const onRemove = (e) => {
        console.log(e.target.value);
        removeItem(e.target.value);
    }
    async function addItem(item_id) {
        await services.getitem({item_id: item_id}).then(async (response) => {
            let res = await services.addtocart({username: username,item_id: Number(item_id), response: response})
            setMessage(res)
            getData()
        }, (error) => {
            console.log(error);
        });
    }
    async function removeItem(item_id) {
        await services.getitem({item_id: item_id}).then(async (response) => {
            let res = await services.removefromcart({username: username, item_id: item_id, response: response})
            setMessage(res)
            getData()
        }, (error) => {
            console.log(error);
        });
    }
    function error()
    {
        if (message === "Order removed successfully" || message === "Updated order successfully" || message === "Added item to order successfully") {
            return <div className="cartsuccess">{message}</div>
        }
        else{
            return <div className="carterror">{message}</div>
        }
    }
    async function getData() {
        if(username) {
            let response = await services.getallorders({username: username})
            let sum = 0;
            console.log(response[0]);
            for (let i = 0; i < response.length; i++) {
                sum += response[i].item_price * response[i].quantity;
                //console.log(response[i].item_price);
                //console.log(response[i].quantity);
                //console.log(sum)
            }
            setTotal(sum)
            setcartlength(response.length)
            setData(response)
            setLoadingData(false);
        }
    }
    useEffect(() => {
        if (loadingData) {
            // if the result is not ready so you make the axios call
            getData();
        }
    }, [getData, loadingData ]);
    const listItems = data.map((item) =>
        <div className="card" key={item.item_id}>
            <div className="card_img">
                <img src={item.item_image} />
            </div>
            <div className="card_header">
                <h2>{item.item_name}</h2>
                <p>{item.item_description}</p>
                <p className="price">Item Price: {item.item_price}{item.item_currency}</p>
                <div className="cover"><button className="add" value={item.item_id} onClick={onAdd}>+</button>&nbsp;<h1>{item.quantity}</h1>&nbsp;<button className="remove" value={item.item_id} onClick={onRemove}>-</button></div>
            </div>
        </div>

    );
    const cartitems = data.map((item) =>
        <div className="card" key={item.item_id}>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <h5 className="my-0">{item.item_name} x{item.quantity}</h5>
                    <small className="text-muted">{item.item_description}</small>
                </div>
                <span className="text-muted">${item.item_price}</span>
            </li>
        </div>);
    const cart = () => {
        return (
        <React.Fragment>
            <div>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="title">Your cart</span>
                    <span className="badge bg-secondary badge-pill">{cartlength}</span>
                </h4>
                <ul className="list-group mb-3">
                    {cartitems}
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (US)</span>
                        <strong>${total}</strong>
                    </li>
                </ul>
            </div>
        </React.Fragment>)
    }
    if(username)
    {
        return (
            <div className="shoppingcart">
                <Navbar>
                    <Navbar.Brand ><div className="brand">Shopping Cart of {username}!</div></Navbar.Brand>
                </Navbar>
                <div className="shop_detail">
                    {listItems}
                </div>
                {error()}
                <div className="checkout">
                    <button className="buy" onClick={handleClickOpen}>Check out cart</button>
                </div>
                <Dialog   fullWidth={ false } maxWidth={"md"} open={open} onClose={handleClose}>
                    <DialogContent>
                        <div className="col borders-box">
                            <div className="py-5 text-center">
                                <div className="row s-box">
                                    {paymentCompleted ? successMessage() : <React.Fragment>
                                        <div className="col-md-5 order-md-2 mb-4">
                                            <div className="title">
                                                {cart()}
                                            </div>
                                        </div>
                                        <div className="col-md-7 order-md-1">
                                            <Elements stripe={stripePromise}>
                                                <Cardform amount={total} setPaymentCompleted={setPaymentCompleted} />
                                            </Elements>
                                        </div>
                                    </React.Fragment>}
                                </div>
                            </div>
                            <IconButton className="exit" aria-label="close" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
    else {
        return(<Redirect from="/shopdetail-component" to={{pathname: '/error-component'}}/>)
    }
}
export default ShoppingCartComponent;