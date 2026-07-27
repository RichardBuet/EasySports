export function adaptNascarLiveRace(
    liveFeed,
    lapTimes,
    pitData,
    flagData
) {

    return {

        summary: {

            lap: liveFeed.lap_number,
            totalLaps: liveFeed.laps_in_race,
            lapsToGo: liveFeed.laps_to_go,
            flag: liveFeed.flag_state

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
