import axios from "axios";
import config from "./config";

export default async function getAnalysis(from_date,to_date) {
    return await axios.get(config.apiUrl + "/analysis", {
        params: {
            from_date : from_date,
            to_date : to_date
        }
    });
}

