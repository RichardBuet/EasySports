export function adaptNascarWeekend(data) {

    const race = data.weekend_race[0];

    const results = (race.results ?? [])
        .filter(driver => driver.finishing_position > 0)
        .sort((a, b) => a.finishing_position - b.finishing_position);

    const winner = results[0] ?? {};
    
    console.dir(results[0]);
    
    return {

        raceId: race.race_id,
        race: race.race_name,
        track: race.track_name,
        date: race.race_date,

        winner: winner.driver_fullname ?? "",
        car: winner.car_number ?? "",
        manufacturer: winner.car_make ?? "",
        team: winner.team_name ?? "",

        margin: race.margin_of_victory,
        cautions: race.number_of_cautions,
        cautionLaps: race.number_of_caution_laps,
        averageSpeed: race.average_speed,

        leaderboard: results.map(driver => ({
            position: driver.finishing_position,
            number: driver.car_number,
            driver: driver.driver_fullname,
            manufacturer: driver.car_make,
            team: driver.team_name,
            sponsor: driver.sponsor,
            started: driver.starting_position,
            lapsLed: driver.laps_led,
            points: driver.points_earned
        }))

    };

}
