export function adaptNascarLive(data){

    const manufacturers = {
        Chv: "Chevrolet",
        Frd: "Ford",
        Tyt: "Toyota"
    };

    return {

        lap: data.lap_number,
        totalLaps: data.laps_in_race,
        lapsToGo: data.laps_to_go,
        flag: data.flag_state,

        leaderboard: data.vehicles
            .sort((a,b)=>a.running_position-b.running_position)
            .slice(0,10)
            .map(car=>({

                position: car.running_position,
                number: car.vehicle_number,
                driver: car.driver.full_name,
                manufacturer: manufacturers[car.vehicle_manufacturer] ?? car.vehicle_manufacturer,
                sponsor: car.sponsor_name,
                delta: car.delta,
                lastLap: car.last_lap_time,
                bestLap: car.best_lap_time

            }))

    };

}
