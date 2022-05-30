import axios from "axios";
import config from "./config";

export default async function getRole(roleName) {
    return await axios.get(config.apiUrl+"/users/roles/", {
        params: {
            q : roleName
        }
    });
}
