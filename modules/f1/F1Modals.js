/* MODALS F1 ALL INCLUSIVE */


import { F1 } from "../../services/siteF1.js";

let modalStack = [];


/* =========================================================
   MODAL BASE
========================================================= */

function createModal(content) {

    return `
        <div class="f1-modal-overlay">

            <div class="f1-modal">

                <button
                    class="f1-modal-close"
                    type="button"
                    aria-label="Cerrar"
                >
                    ×
                </button>

                <div class="f1-modal-content">
                    ${content}
                </div>

            </div>

        </div>
    `;
}


function renderModal(content) {

    document
        .querySelector(".f1-modal-overlay")
        ?.remove();

    document.body.insertAdjacentHTML(
        "beforeend",
        createModal(content)
    );

    requestAnimationFrame(() => {

        document
            .querySelector(".f1-modal-overlay")
            ?.classList.add("show");

    });

    initModalEvents();
}


/* =========================================================
   EVENTOS DEL MODAL
========================================================= */

function initModalEvents() {

    const overlay =
        document.querySelector(".f1-modal-overlay");

    const close =
        document.querySelector(".f1-modal-close");

    if (!overlay || !close) return;


    close.addEventListener(
        "click",
        closeF1Modal
    );


    overlay.addEventListener(
        "click",
        event => {

            if (event.target === overlay) {
                closeF1Modal();
            }

        }
    );


    document
        .querySelectorAll("[data-f1-session]")
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    const session =
                        button.dataset.f1Session;

                    const raceRound =
                        button.dataset.f1Round;

                    const roundId =
                        button.dataset.f1RoundId;

                    await loadSession(
                        raceRound,
                        roundId,
                        session
                    );

                }
            );

        });
}


/* =========================================================
   CAMPEONATOS
========================================================= */

async function createChampionship(type) {

    if (type === "drivers") {

        const standings =
            await F1.getStandings();

        return `

            <h2>🏎️ Campeonato de Pilotos</h2>

            <div class="f1-modal-list">

                ${standings.map(driver => `

                    <div class="f1-modal-row">

                        <strong>
                            ${driver.position}
                        </strong>

                        <span>
                            ${driver.driver.fullName}
                        </span>

                        <span>
                            ${driver.constructor.name}
                        </span>

                        <strong>
                            ${driver.points} pts
                        </strong>

                    </div>

                `).join("")}

            </div>

        `;
    }


    const constructors =
        await F1.getConstructorStandings();


    return `

        <h2>🏆 Campeonato de Constructores</h2>

        <div class="f1-modal-list">

            ${constructors.map(team => `

                <div class="f1-modal-row">

                    <strong>
                        ${team.position}
                    </strong>

                    <span>
                        ${team.constructor.name}
                    </span>

                    <strong>
                        ${team.points} pts
                    </strong>

                </div>

            `).join("")}

        </div>

    `;
}


/* =========================================================
   HELPERS
========================================================= */

function formatTime(time) {

    if (!time) return "—";

    return time.substring(0, 5);
}


function formatDay(date) {

    if (!date) return "";

    const days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
    ];

    return days[
        new Date(`${date}T12:00:00`).getDay()
    ];
}


/* =========================================================
   HEADER DE CARRERA
========================================================= */

function createRaceHeader(race) {

    return `

        <div class="f1-race-info">

            <h2>
                🏁 ${race.raceName}
            </h2>

            <p>
                ${race.circuit?.name ?? "—"}
            </p>

            <p>
                🌍 ${race.circuit?.location?.country ?? "—"}
            </p>

            <strong>
                ROUND ${race.round}
            </strong>

        </div>

    `;
}


/* =========================================================
   NEXT RACE
========================================================= */

function createNextRace(race) {

    if (!race) {

        return `
            <h2>📅 Próximo Gran Premio</h2>
            <p>No hay información disponible.</p>
        `;

    }


    const sessions = [];


    if (race.firstPractice) {

        sessions.push({
            date: race.firstPractice.date,
            time: race.firstPractice.time,
            icon: "📅",
            label: "FP1"
        });

    }


    if (race.secondPractice) {

        sessions.push({
            date: race.secondPractice.date,
            time: race.secondPractice.time,
            icon: "📅",
            label: "FP2"
        });

    }


    if (race.thirdPractice) {

        sessions.push({
            date: race.thirdPractice.date,
            time: race.thirdPractice.time,
            icon: "📅",
            label: "FP3"
        });

    }


    if (race.sprintQualifying) {

        sessions.push({
            date: race.sprintQualifying.date,
            time: race.sprintQualifying.time,
            icon: "⚡",
            label: "Sprint Qualifying"
        });

    }


    if (race.sprint) {

        sessions.push({
            date: race.sprint.date,
            time: race.sprint.time,
            icon: "🏁",
            label: "Sprint"
        });

    }


    if (race.qualifying) {

        sessions.push({
            date: race.qualifying.date,
            time: race.qualifying.time,
            icon: "⚡",
            label: "Qualifying"
        });

    }


    sessions.push({

        date: race.date,
        time: race.time,
        icon: "🏁",
        label: "Race"

    });


    sessions.sort((a, b) => {

        const dateA =
            new Date(
                `${a.date}T${a.time || "00:00:00"}`
            );

        const dateB =
            new Date(
                `${b.date}T${b.time || "00:00:00"}`
            );

        return dateA - dateB;

    });


    return `

        ${createRaceHeader(race)}

        <div class="f1-race-schedule">

            ${sessions.map(session => `

                <div class="f1-session">

                    <span>
                        ${session.icon}
                    </span>

                    <div>

                        <strong>
                            ${formatDay(session.date)}
                        </strong>

                        <span>
                            ${session.label}
                        </span>

                    </div>

                    <time>
                        ${formatTime(session.time)}
                    </time>

                </div>

            `).join("")}

        </div>

    `;
}


/* =========================================================
   ALPHA: BUSCAR ROUND ID
========================================================= */

async function findAlphaRace(race) {

    const alpha =
        await F1.getAlphaSchedule(
            race.season
        );


    const races =
        alpha?.MRData?.RaceTable?.Races ??
        alpha?.races ??
        alpha?.schedule ??
        [];


    return races.find(item => {

        const round =
            Number(
                item.round ??
                item.Round ??
                item.race?.round
            );

        return round === Number(race.round);

    }) ?? null;

}


/* =========================================================
   SESIONES DISPONIBLES
========================================================= */

function getSessionMap(race) {

    const sessions = [];


    if (race.firstPractice) {

        sessions.push({
            key: "fp1",
            label: "FP1",
            date: race.firstPractice.date,
            time: race.firstPractice.time
        });

    }


    if (race.secondPractice) {

        sessions.push({
            key: "fp2",
            label: "FP2",
            date: race.secondPractice.date,
            time: race.secondPractice.time
        });

    }


    if (race.thirdPractice) {

        sessions.push({
            key: "fp3",
            label: "FP3",
            date: race.thirdPractice.date,
            time: race.thirdPractice.time
        });

    }


    if (race.sprintQualifying) {

        sessions.push({
            key: "sq",
            label: "SPRINT QUALY",
            date: race.sprintQualifying.date,
            time: race.sprintQualifying.time
        });

    }


    if (race.sprint) {

        sessions.push({
            key: "sprint",
            label: "SPRINT",
            date: race.sprint.date,
            time: race.sprint.time
        });

    }


    if (race.qualifying) {

        sessions.push({
            key: "qualifying",
            label: "QUALY",
            date: race.qualifying.date,
            time: race.qualifying.time
        });

    }


    sessions.push({

        key: "race",
        label: "RACE",
        date: race.date,
        time: race.time

    });


    return sessions;

}


/* =========================================================
   ÚLTIMA SESIÓN FINALIZADA
========================================================= */

function getLastFinishedSession(sessions) {

    const now = new Date();


    const finished =
        sessions.filter(session => {

            const date =
                new Date(
                    `${session.date}T${session.time || "00:00:00"}`
                );

            return date <= now;

        });


    if (!finished.length) {
        return sessions[0];
    }


    return finished.sort((a, b) => {

        const dateA =
            new Date(
                `${a.date}T${a.time || "00:00:00"}`
            );

        const dateB =
            new Date(
                `${b.date}T${b.time || "00:00:00"}`
            );

        return dateB - dateA;

    })[0];

}


/* =========================================================
   BOTONES DE SESIONES
========================================================= */

function createSessionButtons(
    sessions,
    activeSession,
    round,
    roundId
) {

    return `

        <div class="f1-session-selector">

            ${sessions.map(session => `

                <button
                    type="button"
                    class="${session.key === activeSession ? "active" : ""}"
                    data-f1-session="${session.key}"
                    data-f1-round="${round}"
                    data-f1-round-id="${roundId ?? ""}"
                >
                    ${session.label}
                </button>

            `).join("")}

        </div>

    `;

}


/* =========================================================
   RESULTADOS
========================================================= */

function normalizeSessionResults(data) {

    const results =
        data?.MRData?.RaceTable?.Races?.[0]?.Results ??
        data?.MRData?.RaceTable?.Races?.[0]?.QualifyingResults ??
        data?.MRData?.RaceTable?.Races?.[0]?.SprintResults ??
        data?.results ??
        data?.Results ??
        [];


    return results;

}


function renderSessionResults(data) {

    const results =
        normalizeSessionResults(data);


    if (!results.length) {

        return `
            <p class="f1-no-results">
                No hay resultados disponibles.
            </p>
        `;

    }


    return `

        <div class="f1-session-content">

            ${results.map((result, index) => {

                const position =
                    result.position ??
                    result.Position ??
                    index + 1;

                const driver =
                    result.Driver ??
                    result.driver ??
                    {};

                const constructor =
                    result.Constructor ??
                    result.constructor ??
                    {};


                const fullName =
                    driver.fullName ??
                    `${driver.givenName ?? ""} ${driver.familyName ?? ""}`.trim() ??
                    "—";


                return `

                    <div class="f1-modal-row">

                        <strong>
                            ${position}
                        </strong>

                        <span>
                            ${fullName}
                        </span>

                        <span>
                            ${constructor.name ?? "—"}
                        </span>

                        <strong>
                            ${result.points ?? ""}
                            ${result.points != null ? " pts" : ""}
                        </strong>

                    </div>

                `;

            }).join("")}

        </div>

    `;

}


/* =========================================================
   CARGAR SESIÓN
========================================================= */

async function loadSession(
    round,
    roundId,
    session
) {

    const content =
        document.querySelector(
            ".f1-modal-content"
        );

    if (!content) return;


    content.innerHTML = `
        <div class="f1-loading">
            Cargando...
        </div>
    `;


    let data = null;


    try {

        if (session === "race") {

            data =
                await F1.getResults(
                    "current",
                    round
                );

        }

        else if (session === "qualifying") {

            data =
                await F1.getQualifying(
                    "current",
                    round
                );

        }

        else if (session === "sprint") {

            data =
                await F1.getSprint(
                    "current",
                    round
                );

        }

        else {

            data =
                await F1.getSessionResults(
                    roundId,
                    session
                );

        }


        const race =
            await getRaceFromRound(round);


        const alphaRace =
            await findAlphaRace(race);


        const sessions =
            getSessionMap(race);


        content.innerHTML = `

            ${createRaceHeader(race)}

            ${createSessionButtons(
                sessions,
                session,
                round,
                alphaRace?.round_id ??
                alphaRace?.roundId ??
                alphaRace?.id
            )}

            ${renderSessionResults(data)}

        `;


        initModalEvents();

    }

    catch (error) {

        console.error(
            "Error cargando sesión F1:",
            error
        );


        content.innerHTML = `

            <h2>⚠️ Error</h2>

            <p>
                No se pudieron cargar los resultados.
            </p>

        `;

    }

}


/* =========================================================
   OBTENER CARRERA
========================================================= */

async function getRaceFromRound(round) {

    const schedule =
        await F1.getSchedule();


    return schedule.find(
        race =>
            Number(race.round) === Number(round)
    );

}


/* =========================================================
   LAST RACE
========================================================= */

async function createLastRace(race) {

    if (!race) {

        return `
            <h2>🏁 Último Gran Premio</h2>
            <p>No hay información disponible.</p>
        `;

    }


    const sessions =
        getSessionMap(race);


    const selected =
        getLastFinishedSession(
            sessions
        );


    const alphaRace =
        await findAlphaRace(race);


    const roundId =
        alphaRace?.round_id ??
        alphaRace?.roundId ??
        alphaRace?.id ??
        null;


    let data;


    try {

        if (selected.key === "race") {

            data =
                await F1.getResults(
                    "current",
                    race.round
                );

        }

        else if (selected.key === "qualifying") {

            data =
                await F1.getQualifying(
                    "current",
                    race.round
                );

        }

        else if (selected.key === "sprint") {

            data =
                await F1.getSprint(
                    "current",
                    race.round
                );

        }

        else {

            data =
                await F1.getSessionResults(
                    roundId,
                    selected.key
                );

        }

    }

    catch (error) {

        console.error(
            "Error cargando sesión:",
            error
        );

        data = null;

    }


    return `

        ${createRaceHeader(race)}

        ${createSessionButtons(
            sessions,
            selected.key,
            race.round,
            roundId
        )}

        ${renderSessionResults(data)}

    `;

}


/* =========================================================
   MODAL CONTENT
========================================================= */

async function getModalContent(type, data) {

    if (type === "championship") {

        return await createChampionship(data);

    }


    if (type === "next-race") {

        return createNextRace(data);

    }


    if (type === "last-race") {

        return await createLastRace(data);

    }


    return `
        <h2>🏎️ Formula 1</h2>
    `;

}


/* =========================================================
   OPEN
========================================================= */

export async function openF1Modal(
    type,
    data = null
) {

    modalStack.push({
        type,
        data
    });


    const content =
        await getModalContent(
            type,
            data
        );


    renderModal(content);

}


/* =========================================================
   CLOSE
========================================================= */

export function closeF1Modal() {

    const overlay =
        document.querySelector(
            ".f1-modal-overlay"
        );

    if (!overlay) return;


    overlay.classList.remove("show");


    setTimeout(() => {

        overlay.remove();

        modalStack.pop();

    }, 250);

}


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeF1Modal();
        }

    }
);
