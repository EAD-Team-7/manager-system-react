import axios from "axios";
import config from "./config";

export default async function createUser(email, password) {
    return await axios.post(config.apiUrl+'/users/', {
        email: email,
        password: password
    });
}
