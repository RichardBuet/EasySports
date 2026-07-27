const FLAGS = {
    0: { icon: "⚪", name: "Sin bandera" },
    1: { icon: "🟢", name: "Bandera verde" },
    2: { icon: "🟡", name: "Bandera amarilla" },
    3: { icon: "🔴", name: "Bandera roja" },
    4: { icon: "⚪", name: "Última vuelta" },
    5: { icon: "🏁", name: "Finalizada" },
    6: { icon: "⚪", name: "Estado 6" },
    7: { icon: "⚪", name: "Estado 7" },
    8: { icon: "🟠", name: "Pista habilitada" },
    9: { icon: "🔵", name: "Actividad finalizada" }
};

const SERIES = {
    1: "Cup Series",
    2: "O'Reilly Series",
    3: "Craftsman Truck"
};

const SESSIONS = {
    1: { icon: "🛠", name: "Práctica" },
    2: { icon: "⏱", name: "Clasificación" },
    3: { icon: "🏎", name: "Carrera" }
};



export function adaptNascarLiveRace(
    liveFeed,
    lapTimes,
    pitData,
    flagData
) {

    return {

summary: {

    series: SERIES[liveFeed.series] ?? "NASCAR",

    session: {
        1: { icon: "🛠", name: "Practice" },
        2: { icon: "⏱", name: "Qualifying" },
        3: { icon: "🏎", name: "Race" }
    }[liveFeed.run_type],

    lap:
        liveFeed.run_type === 3
            ? `${liveFeed.lap_number} / ${liveFeed.laps_in_race}`
            : `${liveFeed.lap_number}`,

    flag: FLAGS[liveFeed.flag_state]

},

        leaderboard: liveFeed.vehicles.map(vehicle => ({

    position: vehicle.running_position,

    number: vehicle.vehicle_number,

    driver: vehicle.driver.full_name,

    manufacturer: vehicle.vehicle_manufacturer,

    sponsor: vehicle.sponsor_name,

    gap: vehicle.delta,

    averageSpeed: vehicle.average_speed,

    lastLap: vehicle.last_lap_time,

    bestLap: vehicle.best_lap_time,

    pitStops: vehicle.pit_stops.length,

    lapsLed: vehicle.laps_led.reduce(
        (total, stint) => total + (stint.end_lap - stint.start_lap + 1),
        0
    ),

    fastestLaps: vehicle.fastest_laps_run,

    startingPosition: vehicle.starting_position,

    onTrack: vehicle.is_on_track,

    onDVP: vehicle.is_on_dvp,

    status: vehicle.status

})),
        lapTimes,
        pitData,
        flagData

    };

}
