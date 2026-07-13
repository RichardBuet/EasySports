export function adaptNascarRaceList(data) {

    return data.map(race => ({

        raceId: race.race_id,

        name: race.race_name,

        track: race.track_name,

        date: race.race_date,
        
        laps: race.scheduled_laps,

        scheduledLaps: race.scheduled_laps,

        completed: race.actual_laps > 0,

        winner:
            race.actual_laps > 0 && race.race_comments
                ? race.race_comments.split(" wins")[0]
                : "-"

    }));

}
