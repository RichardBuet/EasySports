export function adaptNascarStandings(data) {

    return [...data]
    .sort((a, b) => a.position - b.position)
    .map(driver => ({

        position: driver.position,

        driverId: driver.driver_id,

        driver: driver.driver_name,

        number: driver.car_no,

        manufacturer: driver.manufacturer,

        points: driver.points,

        wins: driver.wins,

        poles: driver.poles,

        top5: driver.top_5,

        top10: driver.top_10,

        starts: driver.starts,

        lapsLed: driver.laps_led,

        stagePoints: driver.stage_points,

        deltaLeader: driver.delta_leader,

        deltaNext: driver.delta_next,

        clinched: driver.is_clinch

    }));

}
