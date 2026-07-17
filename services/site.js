import { NASCARLive } from "./nascar/live.js";
import { adaptNascarLive } from "./adapters/nascarLiveAdapter.js";
import { NASCARWeekend } from "./nascar/weekend.js";
import { adaptNascarWeekend } from "./adapters/nascarWeekendAdapter.js";
import { NASCARRaceList } from "./nascar/raceList.js";
import { adaptNascarRaceList } from "./adapters/nascarRaceListAdapter.js";
import { state } from "../config/state.js";

export class NASCAR {

    static async getLiveRace() {
        const data = await NASCARLive.getLiveRace();
        return adaptNascarLive(data);
    }
    
static async getWeekend(raceId){
    const data=await NASCARWeekend.getWeekend(
        raceId,
        2026,
        state.nascarSeries
    );
    return adaptNascarWeekend(data);
}
    
    static async getRaceList(){
    const data=await NASCARRaceList.getRaceList(
        state.nascarSeries
    );
    return adaptNascarRaceList(data);
}
        
static async getNextRace(){

    const races=await this.getRaceList();

    return races.find(r=>!r.completed);

}

static async getLastRace(){

    const races=await this.getRaceList();

    return [...races]
        .reverse()
        .find(r=>r.completed);

}
static getSeriesName() {

    switch (state.nascarSeries) {

        case 1:
            return "Cup Series";

        case 2:
            return "O'Reilly Series";

        case 3:
            return "Craftsman Truck Series";

        default:
            return "NASCAR";

    }

}
    
}
