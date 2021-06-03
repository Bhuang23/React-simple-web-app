import axios from 'axios';

export default class services {
    static async userlogin(userdata) {
        try {
            let response = await axios.post('http://localhost:4000/users/login', userdata)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            if (response.data.data.length===0) {
                return "The username or password you have entered is invalid"
            }
            return response.data.message
        } catch (e){
            return "error"
        }
    }
    static async getuser(userdata) {
        try {
            let response = await axios.post('http://localhost:4000/users/getuser', userdata)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e){
            return "Couldn't get user"
        }
    }
    static async updateuser(userdata) {
        try {
            let response = await axios.post('http://localhost:4000/users/updateuser', userdata)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e){
            return "Couldn't get user"
        }
    }
    static async createuser(userdata) {
        try {
            let response = await axios.post('http://localhost:4000/users/newuser', userdata)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            if (response.data.data.length===0) {
                return "Username or email already taken"
            }
            return response.data.message
        } catch (e) {
            return "Missing username, email or password"
        }
    }
    static async createitem(data) {
        try {
            let response = await axios.post('http://localhost:4000/shop/createItem', data)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e) {
            return "unable to create item"
        }
    }
    static async getallitems() {
        try {
            let response = await axios.get('http://localhost:4000/shop/getAll')
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e) {
            return "unable to retrieve items"
        }
    }
    static async getitem(item_id) {
        try {
            let response = await axios.post('http://localhost:4000/shop/getId', item_id)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e) {
            return "unable to retrieve item"
        }
    }
    static async addtocart(item) {
        try {
            let response = await axios.post('http://localhost:4000/users/addtocart', item)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e) {
            return "unable to add item to cart"
        }
    }
    static async removefromcart(item) {
        try {
            let response = await axios.post('http://localhost:4000/users/removefromcart', item)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e) {
            return "unable to remove item from cart"
        }
    }
    static async getcategory(category) {
        try {
            let response = await axios.post('http://localhost:4000/shop/getCategory', category)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e) {
            return "unable to retrieve items"
        }
    }
    static async getname(name) {
        try {
            let response = await axios.post('http://localhost:4000/shop/getName', name)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e) {
            return "unable to retrieve items"
        }
    }
    static async getCategoryName(data) {
        try {
            let response = await axios.post('http://localhost:4000/shop/getCategoryName', data)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            return response.data.data
        } catch (e) {
            return "unable to retrieve items"
        }
    }
}