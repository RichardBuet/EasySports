import { fetchJSON } from "../shared/fetch.js";

export class NASCARFlagData {

    static async getFlagData(raceId, series) {

        const URL = `https://cf.nascar.com/cacher/live/series_${series}/${raceId}/live-flag-data.json`;

        return await fetchJSON(URL);

    }

}
