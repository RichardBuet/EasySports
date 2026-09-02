import { F1 } from "../../services/siteF1.js";

let currentSeason = 2026;
const seasonCache = new Map();


async function getSeasonData(season) {

    const [standings, localData] = await Promise.all([

        F1.getStandings(season),

        fetch(
            new URL(
                `../../data/formula1/race-center/${season}.json`,
                import.meta.url
            )
        ).then(response => {

            if (!response.ok) {
                throw new Error(
                    `No se pudo cargar Race Center ${season}: ${response.status}`
                );
            }

            return response.json();
        })

    ]);

    const races = localData.races ?? [];

    const drivers = standings ?? [];

    const raceResults = races.map(race => ({
        race: {
            round: Number(race.round),
            raceName: race.raceName,
            circuit: {
                location: {
                    country: race.circuit?.country
                }
            }
        },
        results: race.results ?? []
    }));

    const data = {
        races,
        drivers,
        raceResults
    };

    seasonCache.set(season, data);

    return data;
}


function getRacePosition(driver, results) {

    const result = results.find(item =>
        item.driver === driver?.driver?.code ||
        item.driverId === driver?.driver?.id
    );

    if (!result) {
        return "—";
    }

    if (
        result.positionText === "R" ||
        result.positionText === "D"
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

                                <em>
                                    ${race.raceName?.replace(
                                        /\s+Grand Prix$/i,
                                        ""
                                    ) ?? ""}
                                </em>
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
                                            Number(
                                                item.race.round
                                            ) === Number(
                                                race.round
                                            )
                                    );

                                const position =
                                    getRacePosition(
                                        driver,
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


function startRaceCenterLoad(raceCenter, season) {

    const content =
        raceCenter.querySelector(
            ".race-center-content"
        );

    if (!content) {
        return;
    }

    /*
     * Si ya tenemos la temporada en cache,
     * la mostramos inmediatamente.
     */
    if (seasonCache.has(season)) {

        const data =
            seasonCache.get(season);

        content.innerHTML =
            renderTable(
                data.races,
                data.drivers,
                data.raceResults
            );

        return;
    }

    content.innerHTML =
        renderLoading(season);

    getSeasonData(season)
        .then(data => {

            if (currentSeason !== season) {
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

    const seasons = Array.from(
        {
            length: 2026 - 1950 + 1
        },
        (_, i) => 1950 + i
    );

    const html = `
        <section class="raceCenter">

            <div class="race-center-toolbar">

                <div class="race-center-title">
                    <span>🏁</span>
                    <h2>Race Center</h2>
                </div>

                <div class="race-center-season-carousel">

                    <button
                        type="button"
                        class="race-center-season-arrow"
                        data-season-scroll="left"
                        aria-label="Años anteriores"
                    >
                        ‹
                    </button>

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

                    <button
                        type="button"
                        class="race-center-season-arrow"
                        data-season-scroll="right"
                        aria-label="Años siguientes"
                    >
                        ›
                    </button>

                </div>

            </div>

            <div class="race-center-content">
                ${renderLoading(currentSeason)}
            </div>

        </section>
    `;

    setTimeout(() => {

        const raceCenter =
            document.querySelector(
                ".raceCenter"
            );

        if (!raceCenter) {
            return;
        }

        /*
         * Llevar automáticamente 2026 al centro
         * del carrusel al iniciar.
         */
        const activeButton =
            raceCenter.querySelector(
                `[data-race-season="${currentSeason}"]`
            );

        if (activeButton) {

            activeButton.scrollIntoView({
                behavior: "instant",
                inline: "center",
                block: "nearest"
            });

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

        /*
         * Flechas del carrusel
         */
        const scrollButton =
            event.target.closest(
                "[data-season-scroll]"
            );

        if (scrollButton) {

            const carousel =
                scrollButton
                    .closest(
                        ".race-center-season-carousel"
                    )
                    ?.querySelector(
                        ".race-center-seasons"
                    );

            if (!carousel) {
                return;
            }

            carousel.scrollBy({
                left:
                    scrollButton.dataset.seasonScroll === "left"
                        ? -300
                        : 300,
                behavior: "smooth"
            });

            return;
        }


        /*
         * Selección de temporada
         */
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

        currentSeason = season;


        /*
         * Actualizar estado visual
         */
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
         * Centrar año seleccionado
         */
        button.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest"
        });


        startRaceCenterLoad(
            raceCenter,
            season
        );

    }
);
