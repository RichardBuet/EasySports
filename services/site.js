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

import { NASCARLapTimes } from "./nascar/lapTimes.js";
import { NASCARPitData } from "./nascar/pitData.js";
import { NASCARFlagData } from "./nascar/flagData.js";

import { adaptNascarLiveRace } from "./adapters/nascarLiveRaceAdapter.js";

import { fetchJSON } from "./shared/fetch.js";


/* =========================================================
   CACHE
   ========================================================= */

/*
   Guardamos tanto:

   1. El resultado ya obtenido.
   2. La Promise mientras la petición está en curso.

   Esto evita que varios módulos hagan la misma petición
   simultáneamente.
*/

const raceListCache = new Map();
const raceListPending = new Map();

let driversCache = null;
let driversPending = null;

const weekendCache = new Map();
const weekendPending = new Map();


/* =========================================================
   MANUFACTURER LOGOS
   ========================================================= */

const MANUFACTURER_LOGOS = {

    Chevrolet:
        "../assets/logos/nascar/chevrolet-logo.svg",

    Chv:
        "../assets/logos/nascar/chevrolet-logo.svg",

    Ford:
        "../assets/logos/nascar/ford-logo.svg",

    Frd:
        "../assets/logos/nascar/ford-logo.svg",

    Toyota:
        "../assets/logos/nascar/toyota-horizontal-logo.svg",

    Tyt:
        "../assets/logos/nascar/toyota-horizontal-logo.svg",

    Dodge:
        "../assets/logos/nascar/ram-horizontal-logo.svg",

    Ram:
        "../assets/logos/nascar/ram-horizontal-logo.svg"

};


/* =========================================================
   NASCAR
   ========================================================= */

export class NASCAR {


    /* =====================================================
       HERO
       ===================================================== */

    static async getHeroData() {

        const live =
            await this.getLiveRace();


        if (live.isLive) {

            const event =
                await this.getRaceById(
                    live.raceId
                );


            if (
                event &&
                event.series === state.nascarSeries
            ) {

                const seriesName = {

                    1: "Cup Series",
                    2: "O'Reilly Series",
                    3: "Craftsman Truck Series"

                };


                return {

                    type: "live",

                    title:
                        event.race.name.length > 35
                            ? event.race.name
                                .substring(0, 35)
                                .trim() + "..."
                            : event.race.name,

                    subtitle:
                        event.race.track.length > 31
                            ? event.race.track
                                .substring(0, 31)
                                .trim() + "..."
                            : event.race.track,

                    image: null,

                    meta: [

                        {
                            icon: "🏁",
                            value:
                                seriesName[event.series]
                        },

                        {
                            icon: "🔴",
                            value:
                                live.sessionName,
                            live: true
                        }

                    ]

                };

            }

        }


        const race =
            await this.getNextRace();


        const date =
            new Date(race.date);


        return {

            type: "next",

            title:
                race.name.length > 35
                    ? race.name
                        .substring(0, 35)
                        .trim() + "..."
                    : race.name,

            subtitle:
                race.track.length > 31
                    ? race.track
                        .substring(0, 31)
                        .trim() + "..."
                    : race.track,

            image: null,

            meta: [

                {
                    icon: "📅",
                    value:
                        date.toLocaleDateString(
                            undefined,
                            {
                                weekday: "short",
                                day: "numeric",
                                month: "short"
                            }
                        )
                },

                {
                    icon: "🕒",
                    value:
                        date.toLocaleTimeString(
                            [],
                            {
                                hour: "2-digit",
                                minute: "2-digit"
                            }
                        )
                },

                {
                    icon: "🏁",
                    value:
                        `${race.scheduledLaps} Laps`
                },

                {
                    icon: "🟢",
                    value: "Next Race"
                }

            ]

        };

    }


    /* =====================================================
       SERIES
       ===================================================== */

    static getSeriesNameById(seriesId) {

        switch (Number(seriesId)) {

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


    /* =====================================================
       RACE CENTER
       ===================================================== */

    static async getRaceCenterData() {

        const race =
            await this.getLastRace();


        const weekend =
            await this.getWeekend(
                race.raceId
            );


        return {

            type: "last",

            raceId:
                race.raceId,

            seriesId:
                race.seriesId,

            title:
                race.name,

            date:
                new Date(
                    race.date
                ).toLocaleDateString(
                    undefined,
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }
                ),

            track:
                race.track,

            winner: {

                ...weekend.winner,

                manufacturerLogo:
                    MANUFACTURER_LOGOS[
                        weekend.winner?.manufacturer
                    ] ?? null

            },

            meta: [

                {
                    icon: "🏁",
                    value:
                        `${race.actualLaps} / ${race.scheduledLaps} Laps`
                },

                {
                    icon: "🟡",
                    value:
                        `${weekend.cautions} amarillas`
                },

                {
                    icon: "💨",
                    value:
                        `${weekend.averageSpeed} mph`
                }

            ]

        };

    }


    /* =====================================================
       LIVE
       ===================================================== */

    static async getLiveRace() {

        const data =
            await NASCARLive.getLiveRace();

        return adaptNascarLive(data);

    }


    /* =====================================================
       RACE BY ID
       ===================================================== */

    static async getRaceById(raceId) {

        for (
            const series of [1, 2, 3]
        ) {

            const races =
                await this.getRaceList(
                    series
                );


            const race =
                races.find(
                    r =>
                        r.raceId === raceId
                );


            if (race) {

                return {

                    series,

                    race

                };

            }

        }


        return null;

    }


    /* =====================================================
       WEEKEND
       ===================================================== */

    static async getWeekend(raceId) {

        const key =
            Number(raceId);


        /* RESULTADO YA CACHEADO
        */

        if (
            weekendCache.has(key)
        ) {

            return weekendCache.get(key);

        }


        /* PETICIÓN YA EN CURSO
        */

        if (
            weekendPending.has(key)
        ) {

            return weekendPending.get(key);

        }


        /* PRIMERA PETICIÓN
        */

        const request =
            (async () => {

                try {

                    const data =
                        await NASCARWeekend.getWeekend(
                            raceId,
                            2026,
                            state.nascarSeries
                        );


                    const weekend =
                        adaptNascarWeekend(
                            data
                        );


                    if (
                        raceId === 5622
                    ) {

                        console.log(
                            "🏁 RICHMOND 5622"
                        );

                        console.log(
                            weekend
                        );

                    }


                    weekendCache.set(
                        key,
                        weekend
                    );


                    return weekend;

                } finally {

                    weekendPending.delete(
                        key
                    );

                }

            })();


        weekendPending.set(
            key,
            request
        );


        return request;

    }


    /* =====================================================
       CURRENT WEEKEND
       ===================================================== */

    static async getCurrentWeekend() {

        const race =
            await this.getLastRace();


        return this.getWeekend(
            race.raceId
        );

    }


    /* =====================================================
       RACE LIST
       ===================================================== */

    static async getRaceList(
        series = state.nascarSeries
    ) {

        const key =
            Number(series);


        /* RESULTADO YA CACHEADO
        */

        if (
            raceListCache.has(key)
        ) {

            return raceListCache.get(key);

        }


        /* PETICIÓN YA EN CURSO
        */

        if (
            raceListPending.has(key)
        ) {

            return raceListPending.get(key);

        }


        /* PRIMERA PETICIÓN  */

        const request =
            (async () => {

                try {

                    const data =
                        await NASCARRaceList.getRaceList(
                            series
                        );


                    const races =
                        adaptNascarRaceList(
                            data
                        );


                    raceListCache.set(
                        key,
                        races
                    );


                    return races;

                } finally {

                    raceListPending.delete(
                        key
                    );

                }

            })();


        raceListPending.set(
            key,
            request
        );


        return request;

    }


    /* =====================================================
       NEXT RACE
       ===================================================== */

    static async getNextRace() {

        const races =
            await this.getRaceList();


        return races.find(
            r =>
                !r.completed
        );

    }


    /* =====================================================
       LAST RACE
       ===================================================== */

    static async getLastRace() {

        const races =
            await this.getRaceList();


        return [...races]
            .reverse()
            .find(
                r =>
                    r.completed
            );

    }


    /* =====================================================
       SERIES NAME
       ===================================================== */

    static getSeriesName() {

        switch (
            state.nascarSeries
        ) {

            case 1:
                return "Cup Series";

            case 2:
                return "O'Reilly Series";

            case 3:
                return "Craftsman Truck Series";

            default:
                return "NASCAR 2026";

        }

    }


    /* =====================================================
       TIMELINE
       ===================================================== */

    static async getTimeline(
        window = 2
    ) {

        const races =
            await this.getRaceList();


        let currentIndex =
            races.findIndex(
                r =>
                    !r.completed
            );


        /* Si terminó la temporada,
           usar la última carrera.  */

        if (
            currentIndex === -1
        ) {

            currentIndex =
                races.length - 1;

        }


        return {

            previous:
                races.slice(
                    Math.max(
                        0,
                        currentIndex - window
                    ),
                    currentIndex
                ),

            current:
                races[currentIndex],

            next:
                races.slice(
                    currentIndex + 1,
                    currentIndex + 1 + window
                ),

            all:
                races,

            currentIndex

        };

    }


    /* =====================================================
       STANDINGS
       ===================================================== */

    static async getStandings(
        series = state.nascarSeries
    ) {

        const data =
            await NASCARStandings.getStandings(
                series
            );


        return adaptNascarStandings(
            data
        );

    }


    /* =====================================================
       DRIVERS
       ===================================================== */

    static async getDrivers() {

        /* RESULTADO YA CACHEADO    */

        if (
            driversCache
        ) {

            return driversCache;

        }


        /* PETICIÓN YA EN CURSO    */

        if (
            driversPending
        ) {

            return driversPending;

        }


        /* PRIMERA PETICIÓN
        */

        driversPending =
            (async () => {

                try {

                    const data =
                        await NASCARDrivers.getDrivers();


                    const drivers =
                        adaptNascarDrivers(
                            data
                        ).map(
                            driver => ({

                                ...driver,

                                manufacturerLogo:
                                    MANUFACTURER_LOGOS[
                                        driver.manufacturer
                                    ] ?? null

                            })
                        );


                    driversCache =
                        drivers;


                    return drivers;

                } finally {

                    driversPending =
                        null;

                }

            })();


        return driversPending;

    }


    /* =====================================================
       STANDINGS + DRIVERS
       ===================================================== */

    static async getStandingsWithDrivers(
        series = state.nascarSeries
    ) {

        const [
            standings,
            drivers
        ] = await Promise.all([

            this.getStandings(
                series
            ),

            this.getDrivers()

        ]);


        return standings.map(
            driver => {

                const profile =
                    drivers.find(
                        d =>
                            d.driverId ===
                            driver.driverId
                    );


                const manufacturerLogo =
                    profile?.manufacturer &&
                    profile.manufacturer.trim() !== ""
                        ? profile.manufacturer
                        : MANUFACTURER_LOGOS[
                            driver.manufacturer
                        ] ?? null;


                return {

                    ...driver,

                    profile:
                        profile

                            ? {
                                ...profile,
                                manufacturerLogo
                            }

                            : {
                                manufacturerLogo
                            }

                };

            }
        );

    }


    /* =====================================================
       DRIVER
       ===================================================== */

    static async getDriver(
        driverId,
        series = state.nascarSeries
    ) {

        const drivers =
            await this.getStandingsWithDrivers(
                series
            );


        return drivers.find(
            driver =>
                driver.driverId ===
                Number(driverId)
        ) ?? null;

    }


    /* =====================================================
       HERO STATE
       ===================================================== */

    static async getHeroState(
        series = state.nascarSeries
    ) {

        const [
            hero,
            races
        ] = await Promise.all([

            this.getHeroData(),

            this.getRaceList(
                series
            )

        ]);


        const nextRace =
            races.find(
                r =>
                    !r.completed
            );


        if (
            hero.type === "live"
        ) {

            return {

                state: "LIVE",

                data: hero

            };

        }


        if (
            nextRace
        ) {

            const today =
                new Date();

            const raceDate =
                new Date(
                    nextRace.date
                );


            const isToday =
                today.getFullYear() ===
                    raceDate.getFullYear() &&

                today.getMonth() ===
                    raceDate.getMonth() &&

                today.getDate() ===
                    raceDate.getDate();


            if (
                isToday
            ) {

                return {

                    state: "TODAY",

                    data: hero

                };

            }

        }


        return {

            state: "UPCOMING",

            data: hero

        };

    }


    /* =====================================================
       LIVE FULL
       ===================================================== */

    static async getLiveRaceData() {

        try {

            const [

                liveFeed,
                lapTimes,
                pitData,
                flagData

            ] = await Promise.all([

                NASCARLive.getLiveRace(),

                fetchJSON(
                    "/EasySports/data/nascar/live/lap-times.json"
                ),

                fetchJSON(
                    "/EasySports/data/nascar/live/live-pit-data.json"
                ),

                fetchJSON(
                    "/EasySports/data/nascar/live/live-flag-data.json"
                )

            ]);


            const data =
                adaptNascarLiveRace(

                    liveFeed,

                    lapTimes,

                    pitData,

                    flagData

                );


            /*     getDrivers() ahora usa cache.

               Por lo tanto abrir LIVE FULL no debería
               volver a descargar drivers.json si ya fue
               cargado durante la página.
            */

            const drivers =
                await this.getDrivers();


            data.leaderboard =
                data.leaderboard.map(
                    driver => {

                        const profile =
                            drivers.find(
                                d =>
                                    d.driverId ===
                                    driver.driverId
                            );


                        return {

                            ...driver,

                            badge:
                                profile?.badge ??
                                null

                        };

                    }
                );


            data.summary.series =
                this.getSeriesName();


            console.log(
                data
            );


            return data;


        } catch (error) {

            console.error(
                error
            );

            throw error;

        }

    }

}
