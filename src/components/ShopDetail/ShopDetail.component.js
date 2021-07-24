
import services from "../../services/services";
import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import './ShopDetail.css'
import Button from "react-bootstrap/Button";
import {Link, Redirect} from "react-router-dom";
const ShopDetail = () => {
    let username = localStorage.getItem('username')
    const [loadingData, setLoadingData] = useState(true);
    let [name, setNameValue] = useState("");
    let [category, setCategoryValue] = useState([]);
    let [data, setData] = useState([]);
    let [cartlength, setcartlength] = useState(0);
    const [categories, setCategories] = useState([]);
    const [checkedItems, setCheckedItems] = useState(new Map());
    function handlechanges()
    {
        let temp = []
        checkedItems.forEach(function(key,val)
        {
            if(key)
            {
                temp.push(val);
            }
        });
        category = temp;
        setCategoryValue(category);
    }
    const handlecategoryChange = (event) => {
            var isChecked = event.target.checked;
            var item = event.target.value;
            checkedItems.set(item, isChecked);
            handlechanges();
            getData();
    }
    const handleChange = (e) => {
        console.log(e.target.value);
        setNameValue(e.target.value);
        name = e.target.value;
        getData()
    }
    const onClick = (e) => {
        console.log(e.target.value);
        addItem(e.target.value);
    }
    function getCategories(data) {
        let map = new Map();
        console.log("in getCategories")
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].item_category.length;j++)
            {
                    map.set(data[i].item_category[j], map.get(data[i].item_category[j]) === undefined ? 1 : map.get(data[i].item_category[j]) + 1)
            }
        }
        const res = [];
        map.forEach(function (val, key) {
            res.push({id: key, value: val});
        });
        setCategories(res);
        console.log(res);
        return res;
    }

    async function addItem(item_id) {
        await services.getitem({item_id: item_id}).then(async (response) => {
            await services.addtocart({username: username, response: response})
            getData();
        }, (error) => {
            console.log(error);
        });
    }
    async function getData() {
        if(username) {
            let response = await services.getallorders({username: username})
            console.log(response);
            setcartlength(response.length)
            if (category.length !==0 && name !== "") {
                let response = await services.getCategoryName({item_category: category, item_name: name})
                console.log(response)
                if(response !== "unable to retrieve items") {
                    setData(response)
                    getCategories(response);
                    setLoadingData(false);
                }
                else
                {
                    console.log("error occurred");
                    setData([])
                    setCategories([]);
                    setLoadingData(false);
                }
            } else if (category.length !==0 && name === "") {
                let response = await services.getcategory({item_category: category})
                if(response !== "unable to retrieve items") {
                    setData(response)
                    getCategories(response);
                    setLoadingData(false);
                }
                else
                {
                    console.log("error occurred");
                    setData([])
                    setCategories([]);
                    setLoadingData(false);
                }
            } else if (category.length ===0 && name !== "") {
                let response = await services.getname({item_name: name})
                if(response !== "unable to retrieve items") {
                    setData(response)
                    getCategories(response);
                    setLoadingData(false);
                }
                else
                {
                    console.log("error occurred");
                    setData([])
                    setCategories([]);
                    setLoadingData(false);
                }
            } else {
                let response = await services.getallitems()
                if(response !== "unable to retrieve items") {
                    setData(response)
                    getCategories(response);
                    setLoadingData(false);
                }
                else
                {
                    console.log("error occurred");
                    setData([])
                    setCategories([]);
                    setLoadingData(false);
                }
            }
        }
    }

    useEffect(() => {
        if (loadingData) {
            // if the result is not ready so you make the axios call
            getData();
        }
    }, [data, categories, loadingData]);
    useEffect(() => {
        console.log(categories);
    }, [categories]);

    const categoryItems = categories.map(item => (
            <label>
                <input
                    type="checkbox"
                    checked={checkedItems.get(item.id)}
                    value={item.id}
                    onChange={handlecategoryChange}
                /> {item.id}({item.value})
            </label>
    ))
    const listItems = data.map((item) =>
        <div className="card" key={item.item_id}>
            <div className="card_img">
                <img src={item.item_image} />
            </div>
            <div className="card_header">
                <h2>{item.item_name}</h2>
                <p>{item.item_description}</p>
                <p>In Stock: {item.item_quantity}</p>
                <p className="price">Item Price: {item.item_price}{item.item_currency}</p>
                <div><Button value={item.item_id} onClick={onClick}>Add to cart</Button></div>
            </div>
        </div>

    );
    if(username) {
        return (
            <div className="shop">
                <Navbar>
                    <Navbar.Brand>
                        <div className="brand">Welcome to ShoppingFirst Shopping Mart, {username}!</div>
                    </Navbar.Brand>
                </Navbar>
                <div style={{display: 'flex', margin: "20px", marginTop: "30px"}}>
                    <input className="search" type="text"
                           placeholder="Search item by name" onChange={handleChange} value={name}/>
                    <Link to={'/shoppingcart-component'} style={{textDecoration: 'none'}} className="cart">
                        <span className="title">Shopping cart&nbsp; </span>
                        <span className="badge bg-secondary badge-pill" style={{padding: "3.5%"}}>{cartlength}</span>
                    </Link>
                </div>
                <div>
                        <div className="categoriescontainer">
                            <div className="categoriesbrand">
                                <Navbar>
                                    <Navbar.Brand>
                                        <div className="categoriesname">Categories</div>
                                    </Navbar.Brand>
                                </Navbar>
                            </div>
                            <div className="categories">
                                {categoryItems}
                            </div>
                        </div>
                    <div className="shop_detail">
                        {listItems}
                    </div>
                </div>
            </div>

        )
    }
    else
    {
        return(<Redirect from="/shopdetail-component" push to={{pathname: '/error-component'}}/>)
    }
}
export default ShopDetail;