import { fetchJSON } from "../shared/fetch.js";

export class NASCARWeekend {

    static async getWeekend(raceId, season = 2026, series = 1) {

        const url =
            `https://cf.nascar.com/cacher/${season}/${series}/${raceId}/weekend-feed.json`;

        return await fetchJSON(url);

    }

}
