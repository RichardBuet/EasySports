import { fetchJSON } from "../shared/fetch.js";

//const LIVE_URL = "https://cf.nascar.com/live/feeds/live-feed.json";
const LIVE_URL = "https://raw.githubusercontent.com/RichardBuet/EasySports/main/data/nascar/live/live-feed.json";

export class NASCARLive {

    static async getLiveRace() {

        return await fetchJSON(LIVE_URL);

    }

}
