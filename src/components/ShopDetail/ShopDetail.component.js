
import services from "../../services/services";
import React, {useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import './ShopDetail.css'
import Button from "react-bootstrap/Button";
const ShopDetail = () => {
    let username = localStorage.getItem('username')
    const [loadingData, setLoadingData] = useState(true);
    let [name, setNameValue] = useState("");
    let [category, setCategoryValue] = useState("");
    let [data, setData] = useState([]);
    const handleSelect = (value) => {
        setCategoryValue(value.value)
        category = value.value;
        console.log(category)
        getData()
    };
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

    async function addItem(item_id) {
        await services.getitem({item_id: item_id}).then(async (response) => {
            await services.addtocart({username: username, response: response})
        }, (error) => {
            console.log(error);
        });
    }
    async function getData() {
        if (category !== "" && name !== "") {
            let response = await services.getCategoryName({item_category: category, item_name: name})
            setData(response)
            setLoadingData(false);
        } else if (category !== "" && name === "") {
            let response = await services.getcategory({item_category: category})
            setData(response)
            setLoadingData(false);
        } else if (category === "" && name !== "") {
            let response = await services.getname({item_name: name})
            setData(response)
            setLoadingData(false);
        } else {
            let response = await services.getallitems()
            setData(response)
            setLoadingData(false);
        }
    }
    useEffect(() => {
        if (loadingData) {
            // if the result is not ready so you make the axios call
            getData();
        }
    }, []);

    const listItems = data.map((item) =>
        <div className="card" key={item.item_id}>
            <div className="card_img">
                <img src={item.item_image} />
            </div>
            <div className="card_header">
                <h2>{item.item_name}</h2>
                <p>{item.item_description}</p>
                <p>In Stock: {item.quantity}</p>
                <p className="price">Item Price: {item.item_price}{item.item_currency}</p>
                <div><Button value={item.item_id} onClick={onClick}>Add to cart</Button></div>
            </div>
        </div>

    );
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand > Welcome to ShopFirst Shopping Mart, {username}!</Navbar.Brand>
            </Navbar>
            <div style={{display: 'flex', justifyContent: 'center', margin: "20px", marginTop: "30px"}}>
                <Dropdown style={{width: "45%", float:"center"}}
                          placeholder="Select an category"
                          options={['dental', 'firearms', 'foods', "computers"]}
                          onChange={handleSelect}
                          onSelect={handleSelect} // always fires once a selection happens even if there is no change
                          onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
                          onOpen={() => console.log('open!')}
                />
                <input style={{width: "15%", float:"center",marginLeft:"4%", marginRight:"30%"}}type="text" placeholder="Search item by name" onChange={handleChange} value={name}/>
            </div>
            <div className="shop_detail">
                {listItems}
            </div>
        </div>
    )
}
export default ShopDetail;