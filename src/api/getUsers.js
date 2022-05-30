import axios from "axios";
import config from "./config";

export default async function getUsers(roleId) {
    console.log(roleId);
    return await axios.get(config.apiUrl + "/users", {
        params: {
            role : roleId
        }
    });
}

