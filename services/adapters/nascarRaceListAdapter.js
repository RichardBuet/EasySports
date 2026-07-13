export function adaptNascarWeekend(data) {

    const race = data.weekend_race[0];

    return {

        raceId: race.race_id,
        race: race.race_name,
        track: race.track_name,
        date: race.race_date,

        winner: race.results[0].driver_fullname,
        car: race.results[0].car_number,
        manufacturer: race.results[0].car_make,
        team: race.results[0].team_name,

        margin: race.margin_of_victory,
        cautions: race.number_of_cautions,
        cautionLaps: race.number_of_caution_laps,
        averageSpeed: race.average_speed,

        leaderboard: race.results
            .sort((a, b) => a.finishing_position - b.finishing_position)
            .map(driver => ({

                position: driver.finishing_position,
                number: driver.car_number,
                driver: driver.driver_fullname,
                manufacturer: driver.car_make,
                team: driver.team_name,
                sponsor: driver.sponsor,
                started: driver.starting_position,
                lapsLed: driver.laps_led,
                points: driver.points_earned,
                status: driver.finishing_status

            }))

    };

}
