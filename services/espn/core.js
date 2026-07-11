import { fetchJSON } from "../shared/fetch.js";
const BASE_URL="https://sports.core.api.espn.com/v2/sports/racing/leagues/f1";

export class ESPNCore{
    static async get(path){return await fetchJSON(`${BASE_URL}${path}`);}
    static async getDriverStandings(){return await this.get("/seasons/2026/types/2/standings/0");}
    static async getConstructorStandings(){return await this.get("/seasons/2026/types/2/standings/1");}
    static async getCalendar(){return await this.get("/calendar");}
    static async getEvents(){ return await this.get("/events");}
    static async getByUrl(url){return await fetchJSON(url);}
}
