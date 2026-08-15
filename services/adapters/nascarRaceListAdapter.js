export function adaptNascarRaceList(data) {

    return data.map(race => {

        const completed =
            race.winner_driver_id !== null;

        const raceEvent =
            race.schedule?.find(
                event => event.event_name === "Race"
            );

        const qualifyingEvent =
            race.schedule?.find(
                event =>
                    event.event_name === "Qualifying (Impound)"
            );

        return {

            raceId: race.race_id,

            seriesId: race.series_id,

            name: race.race_name,

            track: race.track_name,

            date: raceEvent?.start_time_utc
                ? `${raceEvent.start_time_utc}Z`
                : null,

            qualifyingDate: qualifyingEvent?.start_time_utc
                ? `${qualifyingEvent.start_time_utc}Z`
                : null,

            scheduledLaps: race.scheduled_laps,

            actualLaps: race.actual_laps,

            scheduledDistance: race.scheduled_distance,

            actualDistance: race.actual_distance,

            winnerDriverId: race.winner_driver_id,

            inspectionComplete: race.inspection_complete,

            schedule: race.schedule,

            television: race.television_broadcaster,

            radio: race.radio_broadcaster,

            completed,

            status:
                completed
                    ? "completed"
                    : "upcoming"

        };

    });

}
