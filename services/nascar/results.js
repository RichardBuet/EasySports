import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://feed.nascar.com/api";

export class NASCARResults{

    static async getResults(seriesId=1,season=2026){

        return await fetchJSON(
            `${BASE_URL}/races/results?series_id=${seriesId}&season=${season}`
        );

    }

}
