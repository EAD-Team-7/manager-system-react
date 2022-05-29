import axios from "axios";
import config from "./config";

async function getUsers() {
    return await axios.get(config.apiUrl + "/users");
}

export default getUsers;
