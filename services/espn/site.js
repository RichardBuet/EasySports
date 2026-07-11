import { fetchJSON } from "../shared/fetch.js";

const BASE_URL="https://site.api.espn.com/apis/site/v2/sports/racing/f1";

export class ESPNSite{

    static async getNews(){

        return await fetchJSON(
            `${BASE_URL}/news`
        );

    }

}
