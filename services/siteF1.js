import {
    getDriverStandings,
    getConstructorStandings as fetchConstructorStandings
} from "./f1/index.js";

import {
    adaptStandings,
    adaptConstructorStandings
} from "./adapters/f1Adapter.js";

export class F1 {

    static async getStandings(season = "current") {

        const data = await getDriverStandings(season);
        return adaptStandings(data);

    }

    static async getConstructorStandings(season = "current") {

        const data = await fetchConstructorStandings(season);
        return adaptConstructorStandings(data);

    }

}
