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

