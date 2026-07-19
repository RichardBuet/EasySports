import { fetchJSON } from "../shared/fetch.js";

export class NASCARDrivers {

    static async getDrivers() {

        const URL = "https://cf.nascar.com/cacher/drivers.json";

        return await fetchJSON(URL);

    }

}
