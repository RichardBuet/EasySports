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
        4: "BLANCA",
        5: "CUADROS",
        6: "DESCONOCIDO",
        7: "DESCONOCIDO",
        8: "PISTA ABIERTA",
        9: "PISTA CERRADA"
    };

    const runTypes = {
        1: { icon: "🟢", name: "Practice" },
        2: { icon: "🔴", name: "Qualifying" },
        3: { icon: "🏁", name: "Race" }
    };

    const sessionInfo = runTypes[data.run_type] ?? {
        icon: "🔴",
        name: "LIVE"
    };

    return {

        raceId: data.race_id,

        session: data.run_name,
        sessionType: data.run_type,
        sessionName: sessionInfo.name,
        sessionIcon: sessionInfo.icon,

        lap: data.lap_number,
        totalLaps: data.laps_in_race,
        lapsToGo: data.laps_to_go,

        flag: flags[data.flag_state] ?? data.flag_state,

        stage: data.stage ? {

            number: data.stage.stage_num,
            finishLap: data.stage.finish_at_lap,
            totalLaps: data.stage.laps_in_stage,
            lapsRemaining: Math.max(0, data.stage.finish_at_lap - data.lap_number)

        } : null,

        leaderboard: [...data.vehicles]

            .sort((a, b) => a.running_position - b.running_position)

            .map(car => ({

                position: car.running_position,
                number: car.vehicle_number,
                driver: car.driver.full_name,
                manufacturer: manufacturers[car.vehicle_manufacturer] ?? car.vehicle_manufacturer,
                sponsor: car.sponsor_name,

                delta: car.delta,

                lastLap: car.last_lap_time,
                bestLap: car.best_lap_time,

                status: car.status,
                lapsCompleted: car.laps_completed,
                onTrack: car.is_on_track

            }))

    };

}
