import { F1 } from "../../services/siteF1.js";

let currentSeason = 2026;

/* =========================================================
   DATOS DE LA TEMPORADA
   ========================================================= */

async function getSeasonData(season) {

    const [schedule, standings] =
        await Promise.all([
            F1.getSchedule(season),
            F1.getStandings(season)
        ]);

    const races =
        schedule ?? [];

    const drivers =
        standings ?? [];

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


/* =========================================================
   POSICIÓN DEL PILOTO
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
                                            Number(
                                                item.race.round
                                            ) ===
                                            Number(
                                                race.round
                                            )
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


/* =========================================================
   CAMBIAR TEMPORADA
   ========================================================= */

function initRaceCenterEvents() {

    document
        .querySelectorAll(
            ".race-center-seasons button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    const season =
                        Number(
                            button.dataset.raceSeason
                        );

                    if (
                        season ===
                        currentSeason
                    ) {
                        return;
                    }

                    currentSeason =
                        season;


                    const raceCenter =
                        button.closest(
                            ".raceCenter"
                        );

                    if (!raceCenter) {
                        return;
                    }


                    const content =
                        raceCenter.querySelector(
                            ".race-center-content"
                        );

                    if (!content) {
                        return;
                    }


                    raceCenter
                        .querySelectorAll(
                            ".race-center-seasons button"
                        )
                        .forEach(btn =>
                            btn.classList.remove(
                                "active"
                            )
                        );


                    button.classList.add(
                        "active"
                    );


                    content.innerHTML = `

                        <div class="race-center-loading">

                            Cargando ${season}...

                        </div>

                    `;


                    try {

                        const data =
                            await getSeasonData(
                                season
                            );


                        content.innerHTML =
                            renderTable(
                                data.races,
                                data.drivers,
                                data.raceResults
                            );


                    } catch (error) {

                        console.error(
                            `❌ Race Center ${season}:`,
                            error
                        );


                        content.innerHTML = `

                            <div class="race-center-empty">

                                No se pudieron cargar
                                los datos de ${season}.

                            </div>

                        `;

                    }

                }
            );

        });

}


/* =========================================================
   CREAR RACE CENTER
   ========================================================= */

export async function createRaceCenter() {

    try {

        console.log(
            "🏁 Race Center: iniciando"
        );


        const data =
            await getSeasonData(
                currentSeason
            );


        console.log(
            "🏁 Race Center: datos OK"
        );


        const html = `

            <section class="raceCenter">


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


        /*
         * El Race Center se inserta en el DOM
         * después de devolver este HTML.
         *
         * Esperamos un instante para registrar
         * los botones de temporada.
         */

        setTimeout(() => {

            initRaceCenterEvents();

        }, 0);


        return html;


    } catch (error) {

        console.error(
            "❌ Race Center error:",
            error
        );


        return `

            <section class="raceCenter">

                <div class="race-center-empty">

                    No se pudieron cargar
                    los datos.

                </div>

            </section>

        `;

    }

}
