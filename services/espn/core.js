import { fetchJSON } from "../shared/fetch.js";
const BASE_URL="https://sports.core.api.espn.com/v2/sports/racing/leagues/f1";
export class ESPNCore{
    static async getDriverStandings(){
        return await fetchJSON(
            `${BASE_URL}/seasons/2026/types/2/standings/0`
        );
    }
}
