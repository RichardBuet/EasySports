import { fetchJSON } from "../shared/fetch.js";

export class NASCARStandings {

    static async getStandings(series = 1) {

        const URL = `https://cf.nascar.com/cacher/2026/${series}/points-feed.json`;

        return await fetchJSON(URL);

    }

}
