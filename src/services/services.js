import axios from 'axios';

export default class services {
    static async userlogin(userdata) {
        try {
            let response = await axios.post('http://localhost:4000/users/login', userdata)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            if (response.data.data.length==0) {
                return "The username or password you have entered is invalid"
            }
            return response.data.message
        } catch (e){
            return "error"
        }
    }
    static async createuser(userdata) {
        try {
            let response = await axios.post('http://localhost:4000/users/newuser', userdata)
                .catch((error) => {
                    return error.message
                })
            console.log(response.data.data)
            if (response.data.data.length==0) {
                return "Username or email already taken"
            }
            return response.data.message
        } catch (e) {
            return "Missing username, email or password"
        }
    }
}