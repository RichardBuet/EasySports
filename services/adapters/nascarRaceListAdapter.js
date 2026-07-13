export function adaptNascarRaceList(data) {

    const now = new Date();

    return data.map(race => {

        const raceDate = new Date(race.race_date);

        let status = "upcoming";

        if (raceDate <= now) {
            status = "completed";
        }

        return {

            raceId: race.race_id,
            name: race.race_name,
            track: race.track_name,
            date: race.race_date,

            scheduledLaps: race.scheduled_laps,
            actualLaps: race.actual_laps,

            status

        };

    });

}