const raceCenterCache = {};
//22:29 24/08/26
async function renderSeason(season,container) {
    if (raceCenterCache[season]) {
        container.innerHTML = raceCenterCache[season];
        return;
    }

    const schedule = await F1.getSchedule(season);
    const now = new Date();

    const races = schedule.filter(race => {
        if (!race.round) return false;

        const raceDate = new Date(
            `${race.date}T${race.time || "00:00:00"}`
        );

        return raceDate <= now;
    });

    const completedRaces = await Promise.all(
        races.map(async race => {
            try {
                const results = await F1.getResults(
                    season,
                    race.round
                );

                if (Array.isArray(results) && results.length) {
                    return {
                        race,
                        results
                    };
                }
            } catch (error) {
                console.warn(
                    `Sin resultados ${season} R${race.round}`,
                    error
                );
            }

            return null;
        })
    );

    const validRaces =
        completedRaces.filter(Boolean);

    const drivers = new Map();

    validRaces.forEach(item => {
        const race = item.race;

        item.results.forEach(result => {
            const id = result.driver.id;

            if (!drivers.has(id)) {
                drivers.set(id,{
                    id,
                    code:
                        result.driver.code ??
                        result.driver.fullName
                            .split(" ")
                            .map(word => word[0])
                            .join("")
                            .toUpperCase(),
                    name:
                        result.driver.fullName,
                    points: 0,
                    races: {}
                });
            }

            const driver = drivers.get(id);

            driver.races[race.round] =
                result.position;

            driver.points +=
                Number(result.points) || 0;
        });
    });

    const driverList =
        [...drivers.values()]
            .sort((a,b) =>
                b.points - a.points
            );

    const html = `
        <table class="raceCenter-table">
            <thead>
                <tr>
                    <th class="sticky-driver">
                        PILOTO
                    </th>

                    ${races.map(race => `
                        <th>
                            <strong>
                                R${race.round}
                            </strong>
                            <small>
                                ${race.raceName.replace(
                                    " Grand Prix",
                                    ""
                                )}
                            </small>
                        </th>
                    `).join("")}

                    <th class="sticky-points">
                        PTS
                    </th>
                </tr>
            </thead>

            <tbody>
                ${driverList.map(driver => `
                    <tr>
                        <td class="sticky-driver">
                            <strong>
                                ${driver.code}
                            </strong>
                            <small>
                                ${driver.name}
                            </small>
                        </td>

                        ${races.map(race => `
                            <td>
                                ${
                                    driver.races[race.round]
                                    ?? "—"
                                }
                            </td>
                        `).join("")}

                        <td class="sticky-points">
                            ${driver.points}
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;

    raceCenterCache[season] = html;
    container.innerHTML = html;
}
