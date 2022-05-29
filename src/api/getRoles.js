import axios from "axios";
import config from "./config";

async function getRoles() {
    return await axios.get(config.apiUrl + "/users/roles");
}

export default getRoles;