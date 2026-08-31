import { F1 } from "../../services/siteF1.js";

let currentSeason = 2026;

async function getSeasonData(season) {

    const [schedule, standings] = await Promise.all([
        F1.getSchedule(season),
        F1.getStandings(season)
    ]);

    const races = schedule ?? [];
    const drivers = standings ?? [];
    const raceResults = [];

    /*
     * =====================================================
     * RESULTADOS DE CARRERAS
     *
     * Cargamos varias carreras simultáneamente,
     * pero limitamos la cantidad de requests concurrentes
     * para evitar saturar la API.
     * =====================================================
     */

    const BATCH_SIZE = 4;

    for (
        let i = 0;
        i < races.length;
        i += BATCH_SIZE
    ) {

        const batch =
            races.slice(
                i,
                i + BATCH_SIZE
            );

        const batchResults =
            await Promise.all(
                batch.map(async race => {

                    try {

                        const results =
                            await F1.getResults(
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

        raceResults.push(
            ...batchResults
        );
    }

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

function getCircuitCode(race) {
    const codes = {
        Australia: "AUS",
        China: "CHN",
        Japan: "JPN",
        Bahrain: "BHR",
        "Saudi Arabia": "SAU",
        USA: "USA",
        Italy: "ITA",
        Monaco: "MON",
        Canada: "CAN",
        Spain: "ESP",
        Austria: "AUT",
        UK: "GBR",
        Belgium: "BEL",
        Hungary: "HUN",
        Netherlands: "NED",
        Azerbaijan: "AZE",
        Singapore: "SGP",
        Mexico: "MEX",
        Brazil: "BRA",
        Qatar: "QAT",
        UAE: "UAE",
        "Las Vegas": "LVG"
    };

    const country =
        race.circuit?.location?.country ?? "";

    return codes[country] ??
        country
            .replace(/[^A-Za-z]/g, "")
            .slice(0, 3)
            .toUpperCase();
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
                                    ${getCircuitCode(race)}
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

function renderLoading(season) {
    return `
        <div class="race-center-loading">

            <div class="race-center-spinner"></div>

            <strong>
                Cargando ${season}
            </strong>

            <span>
                Obteniendo resultados...
            </span>

        </div>
    `;
}

function startRaceCenterLoad(
    raceCenter,
    season
) {
    const content =
        raceCenter.querySelector(
            ".race-center-content"
        );

    if (!content) {
        return;
    }

    content.innerHTML =
        renderLoading(season);

    getSeasonData(season)
        .then(data => {

            if (
                currentSeason !== season
            ) {
                return;
            }

            content.innerHTML =
                renderTable(
                    data.races,
                    data.drivers,
                    data.raceResults
                );

        })
        .catch(error => {

            console.error(
                `❌ Error cargando temporada ${season}:`,
                error
            );

            content.innerHTML = `
                <div class="race-center-empty">
                    No se pudieron cargar los datos de ${season}.
                </div>
            `;

        });
}

export function createRaceCenter() {

    const seasons =
        [2024, 2025, 2026];

    const html = `
        <section class="raceCenter">

            <div class="race-center-toolbar">

                <div class="race-center-title">
                    <span>🏁</span>
                    <h2>Race Center</h2>
                </div>

                <div class="race-center-seasons">

                    ${seasons.map(year => `
                        <button
                            type="button"
                            class="${
                                year === currentSeason
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
                ${renderLoading(currentSeason)}
            </div>

        </section>
    `;

    /*
     * IMPORTANTE:
     *
     * createRaceCenter() YA NO espera
     * a getSeasonData().
     *
     * Devuelve inmediatamente el HTML.
     *
     * La carga pesada comienza después.
     */
    setTimeout(() => {

        const raceCenter =
            document.querySelector(
                ".raceCenter"
            );

        if (!raceCenter) {
            return;
        }

        startRaceCenterLoad(
            raceCenter,
            currentSeason
        );

    }, 0);

    return html;
}

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-race-season]"
            );

        if (!button) {
            return;
        }

        const raceCenter =
            button.closest(
                ".raceCenter"
            );

        if (!raceCenter) {
            return;
        }

        const season =
            Number(
                button.dataset.raceSeason
            );

        currentSeason =
            season;

        const buttons =
            raceCenter.querySelectorAll(
                "[data-race-season]"
            );

        buttons.forEach(btn => {

            btn.classList.toggle(
                "active",
                Number(
                    btn.dataset.raceSeason
                ) === season
            );

        });

        /*
         * Cambiar temporada tampoco
         * bloquea la página.
         */

        startRaceCenterLoad(
            raceCenter,
            season
        );

    }
);
