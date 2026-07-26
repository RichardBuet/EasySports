import { fetchJSON } from "../shared/fetch.js";

export class NASCARPitData {

    static async getPitData(raceId, series) {

        const URL = `https://cf.nascar.com/cacher/live/series_${series}/${raceId}/live-pit-data.json`;

        return await fetchJSON(URL);

    }

}
