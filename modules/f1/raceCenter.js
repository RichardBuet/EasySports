import { F1 } from "../../services/siteF1.js";
/* =========================================================
   RACE CENTER
   ========================================================= */
let currentSeason = 2026;
/* =========================================================
   CARGAR DATOS
   ========================================================= */
async function getSeasonData(season) {
    const [
        schedule,
        standings
    ] = await Promise.all([
        F1.getSchedule(season),
        F1.getStandings(season)
    ]);
    const races = schedule ?? [];
    const drivers = standings ?? [];
    /*
     * Resultados de todas las carreras
     */
    const raceResults =
        await Promise.all(
            races.map(async race => {
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
                }
                catch (error) {
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
/* =========================================================
   CELDA DE RESULTADO
   ========================================================= */
function getRacePosition(
    driverId,
    results
) {
    const result =
        results.find(
            item =>
                item.driver?.id === driverId
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
/* =========================================================
   TABLA
   ========================================================= */
function renderTable(
    races,
    drivers,
    raceResults
) {
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
                                <span>
                                    R${race.round}
                                </span>
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
                                    <td
                                        class="${
                                            position === "DNF"
                                                ? "dnf"
                                                : ""
                                        }"
                                    >
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
/* =========================================================
   RENDER
   ========================================================= */
async function renderSeason(
    container,
    season
) {
    container.innerHTML = `
        <div class="race-center-loading">
            Cargando ${season}...
        </div>
    `;
    try {
        const data =
            await getSeasonData(
                season
            );
        container.innerHTML = `
            <div class="race-center-toolbar">
                <div class="race-center-title">
                    <span>🏁</span>
                    <h2>
                        Race Center
                    </h2>
                </div>
                <div class="race-center-seasons">
                    ${[2024, 2025, 2026].map(year => `
                        <button
                            type="button"
                            class="${
                                Number(year) ===
                                Number(season)
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
            ${renderTable(
                data.races,
                data.drivers,
                data.raceResults
            )}
        `;
    }
    catch (error) {
        console.error(
            "Race Center error:",
            error
        );
        container.innerHTML = `
            <div class="race-center-empty">
                No se pudieron cargar
                los datos de ${season}.
            </div>
        `;
    }
}
/* =========================================================
   EVENTOS
   ========================================================= */
function initRaceCenterEvents(
    container
) {
    container
        .querySelectorAll(
            "[data-race-season]"
        )
        .forEach(button => {
            button.addEventListener(
                "click",
                () => {
                    const season =
                        Number(
                            button.dataset.raceSeason
                        );
                    currentSeason =
                        season;
                    renderSeason(
                        container,
                        season
                    );
                }
            );
        });
}
/* =========================================================
   CREATE
   ========================================================= */
export async function createRaceCenter() {
    const id =
        `race-center-${Date.now()}`;
    const html = `
        <section
            class="raceCenter"
            id="${id}"
        >
            <div class="race-center-loading">
                Cargando Race Center...
            </div>
        </section>
    `;
    /*
     * Esperamos un frame para que
     * el elemento exista en el DOM.
     */
    requestAnimationFrame(
        async () => {
            const container =
                document.getElementById(id);
            if (!container) return;
            await renderSeason(
                container,
                currentSeason
            );
            initRaceCenterEvents(
                container
            );
        }
    );
    return html;
}
