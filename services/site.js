import {NASCARLive} from "./nascar/live.js";
import {adaptNascarLive} from "../adapters/nascarLiveAdapter.js";
import { NASCARResults } from "./nascar/results.js";
import { adaptNascarResults } from "../adapters/nascarResultsAdapter.js";


export class NASCAR{

    static async getLiveRace(){

        const data = await NASCARLive.getLiveRace();

        return adaptNascarLive(data);

    }

static async getResults(){

    const data = await NASCARResults.getResults();

    return adaptNascarResults(data);

}


    
}
