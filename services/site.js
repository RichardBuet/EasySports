import { NASCARLive } from "./nascar/live.js";
import { adaptNascarLive } from "./adapters/nascarLiveAdapter.js";
import { NASCARWeekend } from "./nascar/weekend.js";
import { adaptNascarWeekend } from "./adapters/nascarWeekendAdapter.js";
import { NASCARRaceList } from "./nascar/raceList.js";
import { adaptNascarRaceList } from "./adapters/nascarRaceListAdapter.js";

export class NASCAR {

    static async getLiveRace() {
        const data = await NASCARLive.getLiveRace();
        return adaptNascarLive(data);
    }
    static async getWeekend(raceId) {
        const data = await NASCARWeekend.getWeekend(raceId);
        return adaptNascarWeekend(data);
    }
    
    static async getRaceList(series) {
        const data = await NASCARRaceList.getRaceList(series);
        return adaptNascarRaceList(data);
    }
        

}
