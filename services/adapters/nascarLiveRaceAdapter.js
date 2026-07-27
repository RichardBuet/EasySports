const FLAGS = {
    0: { icon: "⚪", name: "No Flag" },
    1: { icon: "🟢", name: "Green" },
    2: { icon: "🟡", name: "Caution" },
    3: { icon: "🔴", name: "Red" },
    4: { icon: "⚪", name: "White" },
    5: { icon: "🏁", name: "Checkered" },
    6: { icon: "⚪", name: "Unknown" },
    7: { icon: "⚪", name: "Unknown" },
    8: { icon: "🟠", name: "Hot Track" },
    9: { icon: "🔵", name: "Cold Track" }
};

const SERIES = {
    1: "NASCAR Cup Series",
    2: "NASCAR Xfinity Series",
    3: "NASCAR Craftsman Truck Series"
};

const SESSIONS = {
    1: "Practice",
    2: "Qualifying",
    3: "Race"
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

    session: SESSIONS[liveFeed.run_type] ?? "",

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
