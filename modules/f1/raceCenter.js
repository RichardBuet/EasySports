let currentSeason = 2025;

const seasonCache = new Map();


// ============================================================
// CARGAR TEMPORADA DESDE JSON LOCAL
// ============================================================

async function getSeasonData(season) {

    if (seasonCache.has(season)) {
        return seasonCache.get(season);
    }

    const url = new URL(
        `../../data/formula1/race-center/${season}.json`,
        import.meta.url
    );

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `No se pudo cargar Race Center ${season}: ${response.status}`
        );
    }

    const localData = await response.json();

    const races = localData.races ?? [];

    // --------------------------------------------------------
    // Construir pilotos directamente desde los resultados
    // --------------------------------------------------------

    const driverMap = new Map();

    races.forEach(race => {

        (race.results ?? []).forEach(result => {

            const driverId = result.driverId;

            if (driverId == null) {
                return;
            }

            if (!driverMap.has(driverId)) {

                driverMap.set(driverId, {
                    driverId,
                    name: result.name ?? "Unknown",
                    code: normalizeDriverCode(
                        result.driver,
                        result.name
                    ),
                    points: 0
                });

            }

            const driver = driverMap.get(driverId);

            driver.points += Number(
                result.points ?? 0
            );

            // Si en alguna carrera encontramos un código válido,
            // conservarlo.
            if (
                (!driver.code || driver.code === "—") &&
                result.driver &&
                result.driver !== "\\N"
            ) {
                driver.code = result.driver;
            }

        });

    });


    // --------------------------------------------------------
    // Ordenar por puntos
    // --------------------------------------------------------

    const drivers =
        Array.from(driverMap.values())
            .sort((a, b) => {

                if (b.points !== a.points) {
                    return b.points - a.points;
                }

                return a.name.localeCompare(
                    b.name,
                    "es"
                );

            });


    // --------------------------------------------------------
    // Resultados
    // --------------------------------------------------------

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


    seasonCache.set(
        season,
        data
    );

    return data;
}


// ============================================================
// CÓDIGO DEL PILOTO
// ============================================================

function normalizeDriverCode(code, name) {

    if (
        code &&
        code !== "\\N" &&
        code !== "N" &&
        code.length >= 2
    ) {
        return code.toUpperCase();
    }

    if (!name) {
        return "—";
    }

    const cleanName =
        name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^A-Za-z\s-]/g, "")
            .trim();

    const parts =
        cleanName
            .split(/\s+/)
            .filter(Boolean);


    // Ejemplo:
    // Michael Schumacher → MSC
    // Mika Hakkinen → HAK
    // David Coulthard → COU

    if (parts.length >= 2) {

        const first =
            parts[0];

        const last =
            parts[parts.length - 1];

        return (
            first.charAt(0) +
            last.slice(0, 2)
        ).toUpperCase();

    }


    return cleanName
        .replace(/\s/g, "")
        .slice(0, 3)
        .toUpperCase();
}


// ============================================================
// POSICIÓN EN CARRERA
// ============================================================

function getRacePosition(driver, results) {

    const result =
        results.find(
            item =>
                Number(item.driverId) ===
                Number(driver.driverId)
        );


    if (!result) {
        return "—";
    }


    const positionText =
        String(
            result.positionText ?? ""
        );


    // Retiro / descalificación
    if (
        positionText === "R" ||
        positionText === "D" ||
        positionText === "W"
    ) {
        return "DNF";
    }


    // Posición numérica
    if (
        result.position &&
        result.position !== "\\N"
    ) {
        return result.position;
    }


    return "—";
}


// ============================================================
// CÓDIGO DEL CIRCUITO
// ============================================================

function getCircuitCode(race) {

    // Primero usamos el código que ya viene
    // en nuestro JSON.

    if (
        race.circuit?.code &&
        race.circuit.code !== "\\N"
    ) {
        return race.circuit.code
            .slice(0, 3)
            .toUpperCase();
    }


    const codes = {

        Australia: "AUS",
        Argentina: "ARG",
        Brazil: "BRA",
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
        Qatar: "QAT",
        UAE: "UAE",
        Germany: "GER",
        France: "FRA",
        Portugal: "POR",
        Turkey: "TUR",
        "South Africa": "RSA",
        Switzerland: "SUI",
        Sweden: "SWE",
        Morocco: "MAR"
    };


    const country =
        race.circuit?.location?.country ?? "";


    return (
        codes[country] ??
        country
            .replace(/[^A-Za-z]/g, "")
            .slice(0, 3)
            .toUpperCase()
    );
}


// ============================================================
// TABLA
// ============================================================

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
                                    ${getCircuitCode(race)}
                                </small>

                                <em>
                                    ${
                                        race.raceName
                                            ?.replace(
                                                /\s+Grand Prix$/i,
                                                ""
                                            ) ?? ""
                                    }
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
                                    ${driver.code}
                                </span>

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
                                ${driver.points}
                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>
    `;
}


// ============================================================
// LOADING
// ============================================================

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


// ============================================================
// CARGA EN SEGUNDO PLANO
// ============================================================

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


    // Cache
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


// ============================================================
// CREAR RACE CENTER
// ============================================================

export function createRaceCenter() {

    // 1950 → 2025
    const seasons =
        Array.from(
            {
                length: 2025 - 1950 + 1
            },
            (_, i) => 1950 + i
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


    // Ejecutar después de insertar el HTML
    setTimeout(() => {

        const raceCenter =
            document.querySelector(
                ".raceCenter"
            );


        if (!raceCenter) {
            return;
        }


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


// ============================================================
// CLICK
// ============================================================

document.addEventListener(
    "click",
    event => {


        // ------------------------------------------------------
        // FLECHAS
        // ------------------------------------------------------

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


        // ------------------------------------------------------
        // SELECCIÓN DE AÑO
        // ------------------------------------------------------

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


        // Estado visual

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


        // Centrar año

        button.scrollIntoView({

            behavior: "smooth",
            inline: "center",
            block: "nearest"

        });


        // Cargar

        startRaceCenterLoad(
            raceCenter,
            season
        );

    }
);
