export function adaptStandings(data) {
    const standings =
        data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
    return standings.map(driver => ({
        position: Number(driver.position),
        driver: {
            id: driver.Driver.driverId,
            code: driver.Driver.code,
            givenName: driver.Driver.givenName,
            familyName: driver.Driver.familyName,
            fullName: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            nationality: driver.Driver.nationality
        },
        constructor: {
            id: driver.Constructors[0]?.constructorId,
            name: driver.Constructors[0]?.name,
            nationality: driver.Constructors[0]?.nationality
        },
        points: Number(driver.points),
        wins: Number(driver.wins)
    }));
}

export function adaptConstructorStandings(data) {
    const standings =
        data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
    return standings.map(constructor => ({
        position: Number(constructor.position),
        constructor: {
            id: constructor.Constructor.constructorId,
            name: constructor.Constructor.name,
            nationality: constructor.Constructor.nationality
        },
        points: Number(constructor.points),
        wins: Number(constructor.wins)
    }));
}

export function adaptSchedule(data) {
    const races =
        data?.MRData?.RaceTable?.Races ?? [];

    return races.map(race => ({
        season: Number(race.season),
        round: Number(race.round),
        raceName: race.raceName,

        circuit: {
            id: race.Circuit.circuitId,
            name: race.Circuit.circuitName,
            location: {
                locality: race.Circuit.Location.locality,
                country: race.Circuit.Location.country,
                lat: Number(race.Circuit.Location.lat),
                long: Number(race.Circuit.Location.long)
            }
        },

        date: race.date,
        time: race.time,

        firstPractice: race.FirstPractice
            ? {
                date: race.FirstPractice.date,
                time: race.FirstPractice.time
            }
            : null,

        secondPractice: race.SecondPractice
            ? {
                date: race.SecondPractice.date,
                time: race.SecondPractice.time
            }
            : null,

        thirdPractice: race.ThirdPractice
            ? {
                date: race.ThirdPractice.date,
                time: race.ThirdPractice.time
            }
            : null,

        qualifying: race.Qualifying
            ? {
                date: race.Qualifying.date,
                time: race.Qualifying.time
            }
            : null,

        sprint: race.Sprint
            ? {
                date: race.Sprint.date,
                time: race.Sprint.time
            }
            : null,

        sprintQualifying: race.SprintQualifying
            ? {
                date: race.SprintQualifying.date,
                time: race.SprintQualifying.time
            }
            : null
    }));
}


export function adaptResults(data) {
    const results =
        data?.MRData?.RaceTable?.Races?.[0]?.Results ?? [];
    return results.map(result => ({
        position: Number(result.position),
        driver: {
            id: result.Driver.driverId,
            fullName: `${result.Driver.givenName} ${result.Driver.familyName}`,
            code: result.Driver.code
        },
        constructor: {
            id: result.Constructor.constructorId,
            name: result.Constructor.name
        },
        grid: Number(result.grid),
        laps: Number(result.laps),
        status: result.status,
        points: Number(result.points),
        time: result.Time?.time
    }));
}


export function adaptQualifying(data) {
    const qualifying =
        data?.MRData?.RaceTable?.Races?.[0]?.QualifyingResults ?? [];
    return qualifying.map(result => ({
        position: Number(result.position),
        driver: {
            id: result.Driver.driverId,
            fullName: `${result.Driver.givenName} ${result.Driver.familyName}`
        },
        constructor: {
            id: result.Constructor.constructorId,
            name: result.Constructor.name
        },
        q1: result.Q1,
        q2: result.Q2,
        q3: result.Q3
    }));
}


export function adaptSprint(data) {
    const sprint =
        data?.MRData?.RaceTable?.Races?.[0]?.SprintResults ?? [];
    return sprint.map(result => ({
        position: Number(result.position),
        driver: {
            id: result.Driver.driverId,
            fullName: `${result.Driver.givenName} ${result.Driver.familyName}`
        },
        constructor: {
            id: result.Constructor.constructorId,
            name: result.Constructor.name
        },
        points: Number(result.points),
        time: result.Time?.time
    }));
}


export function adaptDrivers(data) {
    const drivers =
        data?.MRData?.DriverTable?.Drivers ?? [];
    return drivers.map(driver => ({
        id: driver.driverId,
        code: driver.code,
        givenName: driver.givenName,
        familyName: driver.familyName,
        fullName: `${driver.givenName} ${driver.familyName}`,
        permanentNumber: driver.permanentNumber,
        nationality: driver.nationality,
        dateOfBirth: driver.dateOfBirth
    }));
}


export function adaptCircuits(data) {
    const circuits =
        data?.MRData?.CircuitTable?.Circuits ?? [];
    return circuits.map(circuit => ({
        id: circuit.circuitId,
        name: circuit.circuitName,
        locality: circuit.Location.locality,
        country: circuit.Location.country,
        lat: Number(circuit.Location.lat),
        long: Number(circuit.Location.long)
    }));
}


export function adaptLaps(data) {
    return data?.MRData?.RaceTable?.Races?.[0]?.Laps ?? [];
}


export function adaptPitStops(data) {
    return data?.MRData?.RaceTable?.Races?.[0]?.PitStops ?? [];
}


export function adaptFastestLaps(data) {
    return data?.MRData?.RaceTable?.Races?.[0]?.Results ?? [];
}


export function adaptSeasons(data) {
    const seasons =
        data?.MRData?.SeasonTable?.Seasons ?? [];
    return seasons.map(season => ({
        season: Number(season.season),
        url: season.url
    }));
}


export function adaptRounds(data) {
    return adaptSchedule(data);
}

export function adaptSeasonResults(data){
    const races=
        data?.MRData?.RaceTable?.Races??[];

    return races.map(race=>({
        season:Number(race.season),
        round:Number(race.round),
        raceName:race.raceName,
        circuit:{
            id:race.Circuit?.circuitId,
            name:race.Circuit?.circuitName,
            country:race.Circuit?.Location?.country,
            locality:race.Circuit?.Location?.locality
        },
        date:race.date,
        results:(race.Results??[]).map(result=>({
            position:Number(result.position),
            driver:{
                id:result.Driver?.driverId,
                fullName:`${result.Driver?.givenName??""} ${result.Driver?.familyName??""}`.trim(),
                code:result.Driver?.code
            },
            constructor:{
                id:result.Constructor?.constructorId,
                name:result.Constructor?.name
            },
            grid:Number(result.grid),
            laps:Number(result.laps),
            status:result.status,
            points:Number(result.points),
            time:result.Time?.time
        }))
    }));
}


