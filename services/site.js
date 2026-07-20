import { NASCARLive } from "./nascar/live.js";
import { adaptNascarLive } from "./adapters/nascarLiveAdapter.js";
import { NASCARWeekend } from "./nascar/weekend.js";
import { adaptNascarWeekend } from "./adapters/nascarWeekendAdapter.js";
import { NASCARRaceList } from "./nascar/raceList.js";
import { adaptNascarRaceList } from "./adapters/nascarRaceListAdapter.js";
import { state } from "../config/state.js";

import { NASCARStandings } from "./nascar/standings.js";
import { adaptNascarStandings } from "./adapters/nascarStandingsAdapter.js";

import { NASCARDrivers } from "./nascar/drivers.js";
import { adaptNascarDrivers } from "./adapters/nascarDriversAdapter.js";



export class NASCAR {

    static async getHeroData() {

        const live = await this.getLiveRace();

        if (live.lap > 0 && live.flag !== "NO ACTIVO") {

            const event = await this.getRaceById(live.raceId);

            if (event) {

                const seriesName = {
                    1: "Cup Series",
                    2: "O'Reilly Series",
                    3: "Craftsman Truck Series"
                };

                return {

                    type: "live",

                    title: event.race.name.length > 35
                        ? event.race.name.substring(0, 35).trim() + "..."
                        : event.race.name,
                    
                    subtitle: event.race.track.length > 31
                        ? event.race.track.substring(0, 31).trim() + "..."
                        : event.race.track,

                    image: null,

                    meta: [

                        {
                            icon: "🏁",
                            value: seriesName[event.series]
                        },

                        {
                            icon: "🔴",
                            value: "LIVE",
                            live: true
                        }

                    ]

                };

            }

        }

        const race = await this.getNextRace();

        const date = new Date(race.date);

        return {

            type: "next",

            title: race.name.length > 35
            ? race.name.substring(0, 35).trim() + "..."
            : race.name,
            
            subtitle: race.track.length > 31
            ? race.track.substring(0, 31).trim() + "..."
            : race.track,

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

    static async getRaceById(raceId) {

        for (const series of [1, 2, 3]) {

            const races = await this.getRaceList(series);

            const race = races.find(r => r.raceId === raceId);

            if (race) {

                return {

                    series,

                    race

                };

            }

        }

        return null;

    }

    static async getWeekend(raceId) {

        const data = await NASCARWeekend.getWeekend(
            raceId,
            2026,
            state.nascarSeries
        );

        return adaptNascarWeekend(data);

    }


    static async getCurrentWeekend() {

    const race = await this.getLastRace();

    return this.getWeekend(race.raceId);

}

    
    static async getRaceList(series = state.nascarSeries) {

        const data = await NASCARRaceList.getRaceList(series);

        return adaptNascarRaceList(data);

    }

    static async getNextRace() {

        const races = await this.getRaceList();

        return races.find(r => !r.completed);

    }

    static async getLastRace() {

        const races = await this.getRaceList();

        return [...races]
            .reverse()
            .find(r => r.completed);

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

    static async getTimeline(window = 2) {
    
        const races = await this.getRaceList();
    
        let currentIndex = races.findIndex(r => !r.completed);
    
        // Si terminó la temporada, usar la última carrera
        if (currentIndex === -1) {
            currentIndex = races.length - 1;
        }
    
        return {
            previous: races.slice(Math.max(0, currentIndex - window), currentIndex),
            current: races[currentIndex],
            next: races.slice(currentIndex + 1, currentIndex + 1 + window),
            all: races,
            currentIndex
        };
    
    }

    static async getStandings(series = state.nascarSeries) {

        const data = await NASCARStandings.getStandings(series);

        return adaptNascarStandings(data);

    }

    static async getDrivers() {

        const data = await NASCARDrivers.getDrivers();

        return adaptNascarDrivers(data);

    }

    static async getStandingsWithDrivers(series = state.nascarSeries) {

        const [standings, drivers] = await Promise.all([
            this.getStandings(series),
            this.getDrivers()
        ]);

        return standings.map(driver => ({

            ...driver,

            profile: drivers.find(d => d.driverId === driver.driverId) ?? null

        }));

    }
    
}
