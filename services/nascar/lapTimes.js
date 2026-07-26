import { fetchJSON } from "../shared/fetch.js";

export class NASCARLapTimes {

    static async getLapTimes(raceId, series) {

        const URL = `https://cf.nascar.com/cacher/${new Date().getFullYear()}/${series}/${raceId}/lap-times.json`;

        return await fetchJSON(URL);

    }

}
