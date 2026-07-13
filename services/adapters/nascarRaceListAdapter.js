export function adaptNascarRaceList(data) {

    return data.map(race => ({

        raceId: race.race_id,
        name: race.race_name,
        track: race.track_name,
        date: race.race_date,
        completed: race.race_status === "FINAL"

    }));

}
