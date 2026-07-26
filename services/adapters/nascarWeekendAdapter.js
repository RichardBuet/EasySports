export function adaptNascarWeekend(data) {

    const race = data.weekend_race[0];

    const results = (race.results ?? [])
        .filter(driver => driver.finishing_position > 0)
        .sort((a, b) => a.finishing_position - b.finishing_position);

    const winner = results[0] ?? {};
    
    //console.dir(results[0]);
    console.table(results);
    return {

        raceId: race.race_id,
        race: race.race_name,
        track: race.track_name,
        date: race.race_date,

        winner: {
    driverId: winner.driver_id,
    name: winner.driver_fullname,
    number: winner.car_number,
    manufacturer: winner.car_make,
    team: winner.team_name
},
second: results[1]
    ? {
        driverId: results[1].driver_id,
        name: results[1].driver_fullname,
        number: results[1].car_number
    }
    : null,
        
        margin: race.margin_of_victory,
        cautions: race.number_of_cautions,
        cautionLaps: race.number_of_caution_laps,
        averageSpeed: race.average_speed,

        leaderboard: results.map(driver => ({
            driverId: driver.driver_id,
            position: driver.finishing_position,
            number: driver.car_number,
            driver: driver.driver_fullname,
            manufacturer: driver.car_make,
            team: driver.team_name,
            sponsor: driver.sponsor,
            started: driver.starting_position,
            lapsLed: driver.laps_led,
            points: driver.points_earned,
                gap:

        driver.finishing_position === 1

            ? "LIDER"

            : driver.diff_laps > 0

                ? `+${driver.diff_laps} Lap${driver.diff_laps > 1 ? "s" : ""}`

                : `+${(driver.diff_time / 1000).toFixed(3)}`,

    status: driver.finishing_status
        }))

    };

}
