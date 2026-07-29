import { getDriverStandings } from "./f1/index.js";
import { adaptStandings } from "./adapters/f1Adapter.js";

export class F1 {

    static async getStandings(season = "current") {
        const data = await getDriverStandings(season);
        return adaptStandings(data);
    }



  
}
