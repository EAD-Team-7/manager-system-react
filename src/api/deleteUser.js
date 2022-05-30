import axios from "axios";
import config from "./config";

export default async function deleteUser(user) {
    return await axios.delete(config.apiUrl + "/users/"+user);
}
