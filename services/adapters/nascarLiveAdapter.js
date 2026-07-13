export function adaptNascarLive(data) {

    const manufacturers = {
        Chv: "Chevrolet",
        Frd: "Ford",
        Tyt: "Toyota"
    };

    const flags = {
        1: "VERDE",
        2: "AMARILLA",
        3: "ROJA",
        4: "FINAL",
        6: "DETENIDA",
        8: "WARMUP",
        9: "NO ACTIVO"
    };

    return {

        lap: data.lap_number,
        totalLaps: data.laps_in_race,
        lapsToGo: data.laps_to_go,
        flag: flags[data.flag_state] ?? data.flag_state,

        leaderboard: data.vehicles
            .sort((a, b) => a.running_position - b.running_position)
            .map(car => ({

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
