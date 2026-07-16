import { fetchJSON } from "../shared/fetch.js";

export class NASCARRaceList {
    static async getRaceList(series=1){
        const URL=`https://cf.nascar.com/cacher/2026/${series}/race_list_basic.json`;
        return await fetchJSON(URL);
    }
}
