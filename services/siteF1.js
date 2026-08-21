import {
    getDriverStandings,
    getConstructorStandings as fetchConstructorStandings,
    getSchedule as fetchSchedule,
    getRaceResults as fetchRaceResults,
    getQualifying as fetchQualifying,
    getSprintResults as fetchSprintResults,
    getSessionResults,
    getAlphaSchedule,
    getDrivers as fetchDrivers,
    getCircuits as fetchCircuits,
    getLaps as fetchLaps,
    getPitStops as fetchPitStops,
    getFastestLaps as fetchFastestLaps,
    getSeasons as fetchSeasons,
    getRounds as fetchRounds
} from "./f1/index.js";

import {
    adaptStandings,
    adaptConstructorStandings,
    adaptSchedule,
    adaptResults,
    adaptQualifying,
    adaptSprint,
    adaptDrivers,
    adaptCircuits,
    adaptLaps,
    adaptPitStops,
    adaptFastestLaps,
    adaptSeasons,
    adaptRounds
} from "./adapters/f1Adapter.js";


export class F1 {

    static async getAlphaSchedule(season = "current") {
        return await getAlphaSchedule(season);
    }


    static async getSessionResults(
        roundId,
        sessionFilter
    ) {
        return await getSessionResults(
            roundId,
            sessionFilter
        );
    }


    static async getStandings(season = "current") {

        const data =
            await getDriverStandings(season);

        return adaptStandings(data);
    }


    static async getConstructorStandings(
        season = "current"
    ) {

        const data =
            await fetchConstructorStandings(season);

        return adaptConstructorStandings(data);
    }


    static async getSchedule(
        season = "current"
    ) {

        const data =
            await fetchSchedule(season);

        return adaptSchedule(data);
    }


    static async getNextRace(
        season = "current"
    ) {

        const schedule =
            await this.getSchedule(season);

        const now = new Date();

        return schedule.find(
            race =>
                new Date(
                    `${race.date}T${race.time}`
                ) > now
        ) ?? schedule[schedule.length - 1];
    }


    /*
     * =====================================================
     * HERO STATE 19:14 21-08-26
     * =====================================================
     */
        static async getHeroState(
            season = "current"
        ) {
        
            /*
             * =====================================================
             * OBTENER DATOS
             * =====================================================
             *
             * Usamos:
             *
             * - schedule       → calendario Jolpica
             * - standings      → campeonato de pilotos
             * - constructors   → campeonato de constructores
             * - alphaSchedule  → eventos Blacktop
             */
        
            const [
                schedule,
                standings,
                constructors,
                alphaSchedule
            ] = await Promise.all([
                this.getSchedule(season),
                this.getStandings(season),
                this.getConstructorStandings(season),
                this.getAlphaSchedule(season)
            ]);
        
        
            /*
             * =====================================================
             * PRÓXIMA CARRERA SEGÚN JOLPICA
             * =====================================================
             */
        
            const now =
                new Date();
        
        
            const nextRace =
                schedule.find(
                    race =>
                        new Date(
                            `${race.date}T${race.time}`
                        ) > now
                ) ??
                schedule[schedule.length - 1];
        
        
            /*
             * =====================================================
             * BLACKTOP
             * =====================================================
             *
             * Blacktop devuelve:
             *
             * {
             *     metadata: {...},
             *     data: {
             *         events: [...]
             *     }
             * }
             *
             * Por eso debemos acceder a:
             *
             * alphaSchedule.data.events
             */
        
        
            const events =
                Array.isArray(
                    alphaSchedule?.data?.events
                )
                    ? alphaSchedule.data.events
                    : [];
        
        
            /*
             * =====================================================
             * EVENTO LIVE
             * =====================================================
             */
        
            const liveEvent =
                events.find(
                    event =>
                        event.status === "ongoing"
                ) ?? null;
        
        
            /*
             * =====================================================
             * PRÓXIMO EVENTO
             * =====================================================
             */
        
            const nextEvent =
                events.find(
                    event =>
                        event.status === "scheduled"
                ) ?? null;
        
        
            /*
             * =====================================================
             * ESTADO DEL HERO
             * =====================================================
             */
        
            let state =
                "NEXT";
        
        
            let currentEvent =
                nextEvent;
        
        
            if (liveEvent) {
        
                state =
                    "LIVE";
        
                currentEvent =
                    liveEvent;
        
            }
        
        
            /*
             * =====================================================
             * BUSCAR CARRERA EQUIVALENTE EN JOLPICA
             * =====================================================
             *
             * Blacktop nos indica qué evento está activo.
             *
             * Jolpica contiene el calendario F1 que ya utiliza
             * EasySports.
             *
             * Ejemplo:
             *
             * Blacktop → Dutch Grand Prix
             * Jolpica  → Dutch Grand Prix
             */
        
        
            let heroRace =
                nextRace;
        
        
            if (currentEvent) {
        
                const eventName =
                    currentEvent.name
                        ?.replace(
                            " Grand Prix",
                            ""
                        )
                        .trim()
                        .toLowerCase();
        
        
                const matchingRace =
                    schedule.find(
                        race => {
        
                            const raceName =
                                race.raceName
                                    ?.replace(
                                        " Grand Prix",
                                        ""
                                    )
                                    .trim()
                                    .toLowerCase();
        
        
                            return (
                                raceName === eventName
                            );
        
                        }
                    );
        
        
                if (matchingRace) {
        
                    heroRace =
                        matchingRace;
        
                }
        
            }
        
        
            /*
             * =====================================================
             * RESULTADO PARA EL HERO
             * =====================================================
             */
        
            return {
        
                state,
        
        
                category:
                    state === "LIVE"
                        ? "🔴 Formula 1 · En Vivo"
                        : "🟢 Formula 1 · Próximo Gran Premio",
        
        
                title:
                    currentEvent?.name ??
                    heroRace?.raceName ??
                    "Formula 1",
        
        
                subtitle:
                    currentEvent?.location?.name ??
                    heroRace?.circuit?.name ??
                    "—",
        
        
                race:
                    heroRace,
        
        
                event:
                    currentEvent,
        
        
                leaders: {
        
                    driver:
                        standings?.[0] ??
                        null,
        
                    constructor:
                        constructors?.[0] ??
                        null
        
                }
        
            };
        
        }


    static async getLastRace(
        season = "current"
    ) {

        const schedule =
            await this.getSchedule(season);

        const now = new Date();

        const races =
            schedule.filter(
                race =>
                    new Date(
                        `${race.date}T${race.time}`
                    ) <= now
            );

        return races[races.length - 1]
            ?? schedule[0];
    }


    static async getResults(
        season = "current",
        round = "last"
    ) {

        const data =
            await fetchRaceResults(
                season,
                round
            );

        return adaptResults(data);
    }


    static async getQualifying(
        season = "current",
        round = "last"
    ) {

        const data =
            await fetchQualifying(
                season,
                round
            );

        return adaptQualifying(data);
    }


    static async getSprint(
        season = "current",
        round = "last"
    ) {

        const data =
            await fetchSprintResults(
                season,
                round
            );

        return adaptSprint(data);
    }


    static async getDrivers(
        season = "current"
    ) {

        const data =
            await fetchDrivers(season);

        return adaptDrivers(data);
    }


    static async getCircuits(
        season = "current"
    ) {

        const data =
            await fetchCircuits(season);

        return adaptCircuits(data);
    }


    static async getLaps(
        season = "current",
        round = "last"
    ) {

        const data =
            await fetchLaps(
                season,
                round
            );

        return adaptLaps(data);
    }


    static async getPitStops(
        season = "current",
        round = "last"
    ) {

        const data =
            await fetchPitStops(
                season,
                round
            );

        return adaptPitStops(data);
    }


    static async getFastestLaps(
        season = "current",
        round = "last"
    ) {

        const data =
            await fetchFastestLaps(
                season,
                round
            );

        return adaptFastestLaps(data);
    }


    static async getSeasons() {

        const data =
            await fetchSeasons();

        return adaptSeasons(data);
    }


    static async getRounds(
        season = "current"
    ) {

        const data =
            await fetchRounds(season);

        return adaptRounds(data);
    }

}
