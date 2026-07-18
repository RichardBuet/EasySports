import { NASCARLive } from "./nascar/live.js";
import { adaptNascarLive } from "./adapters/nascarLiveAdapter.js";
import { NASCARWeekend } from "./nascar/weekend.js";
import { adaptNascarWeekend } from "./adapters/nascarWeekendAdapter.js";
import { NASCARRaceList } from "./nascar/raceList.js";
import { adaptNascarRaceList } from "./adapters/nascarRaceListAdapter.js";
import { state } from "../config/state.js";

export class NASCAR {

static async getHeroData() {

    const live = await this.getLiveRace();
    console.log(live);

    const race = await this.getNextRace();

    const date = new Date(race.date);

    return {

        type: "next",

        title: race.name,

        subtitle: race.track,

        image: null,

        meta: [

            {
                icon: "📅",
                value: date.toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                })
            },

            {
                icon: "🕒",
                value: date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                })
            },

            {
                icon: "🏁",
                value: `${race.scheduledLaps} Laps`
            },

            {
                icon: "🟢",
                value: "Next Race"
            }

        ]

    };

}

    
static async getRaceCenterData() {

    const race = await this.getLastRace();

    return {

        type: "last",

        title: race.name,

        winner: {

            name: "",

            number: "",

            team: ""

        },

        meta: [

            {
                icon: "🏁",
                value: `${race.actualLaps} / ${race.scheduledLaps} Laps`
            }

        ]

    };

}

    
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
