import { F1 } from "../../services/siteF1.js";
//22:33 raro pero anda
let currentSeason = 2026;

async function getSeasonData(season) {
    const [schedule, standings] = await Promise.all([
        F1.getSchedule(season),
        F1.getStandings(season)
    ]);

    const races = schedule ?? [];
    const drivers = standings ?? [];

    const raceResults = await Promise.all(
        races.map(async race => {
            try {
                const results = await F1.getResults(
                    season,
                    race.round
                );

                return {
                    race,
                    results: results ?? []
                };
            } catch (error) {
                console.error(
                    `Error resultados R${race.round}:`,
                    error
                );

                return {
                    race,
                    results: []
                };
            }
        })
    );

    return {
        races,
        drivers,
        raceResults
    };
}

function getRacePosition(driverId, results) {
    const result = results.find(
        item => item.driver?.id === driverId
    );

    if (!result) {
        return "—";
    }

    if (
        result.status &&
        result.status !== "Finished" &&
        !result.status.includes("Lap")
    ) {
        return "DNF";
    }

    return result.position ?? "—";
}

function renderTable(races, drivers, raceResults) {
    if (!drivers.length) {
        return `
            <div class="race-center-empty">
                No hay datos disponibles.
            </div>
        `;
    }

    return `
        <div class="race-center-table-wrap">
            <table class="race-center-table">
                <thead>
                    <tr>
                        <th class="race-center-driver-header">
                            PILOTO
                        </th>

                        ${races.map(race => `
                            <th>
                                <span>R${race.round}</span>
                                <small>
                                    ${race.circuit?.location?.country ?? ""}
                                </small>
                            </th>
                        `).join("")}

                        <th class="race-center-points-header">
                            PTS
                        </th>
                    </tr>
                </thead>

                <tbody>
                    ${drivers.map(driver => `
                        <tr>
                            <th class="race-center-driver">
                                <span>
                                    ${driver.driver?.code ?? "—"}
                                </span>
                                <small>
                                    ${driver.driver?.fullName ?? "—"}
                                </small>
                            </th>

                            ${races.map(race => {
                                const raceData =
                                    raceResults.find(
                                        item =>
                                            Number(item.race.round) ===
                                            Number(race.round)
                                    );

                                const position =
                                    getRacePosition(
                                        driver.driver?.id,
                                        raceData?.results ?? []
                                    );

                                return `
                                    <td class="${
                                        position === "DNF"
                                            ? "dnf"
                                            : ""
                                    }">
                                        ${position}
                                    </td>
                                `;
                            }).join("")}

                            <td class="race-center-points">
                                ${driver.points ?? 0}
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

export async function createRaceCenter() {
    try {
        console.log("🏁 Race Center: iniciando");

        const data = await getSeasonData(currentSeason);

        console.log("🏁 Race Center: datos OK");

        return `
            <section class="raceCenter">

                <div class="race-center-toolbar">

                    <div class="race-center-title">
                        <span>🏁</span>
                        <h2>Race Center</h2>
                    </div>

                    <div class="race-center-seasons">
                        ${[2024, 2025, 2026].map(year => `
                            <button
                                type="button"
                                class="${
                                    Number(year) ===
                                    Number(currentSeason)
                                        ? "active"
                                        : ""
                                }"
                                data-race-season="${year}"
                            >
                                ${year}
                            </button>
                        `).join("")}
                    </div>

                </div>

                <div class="race-center-content">
                    ${renderTable(
                        data.races,
                        data.drivers,
                        data.raceResults
                    )}
                </div>

            </section>
        `;

    } catch (error) {
        console.error(
            "❌ Race Center error:",
            error
        );

        return `
            <section class="raceCenter">

                <div class="race-center-empty">
                    No se pudieron cargar los datos.
                </div>

            </section>
        `;
    }
}
