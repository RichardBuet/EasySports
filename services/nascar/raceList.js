import { fetchJSON } from "../shared/fetch.js";

const URL =
    "https://cf.nascar.com/cacher/2026/1/race_list_basic.json";

export class NASCARRaceList {

    static async getRaceList() {

        return await fetchJSON(URL);

    }

}
