/* MODALS F1 ALL INCLUSIVE  20:11 20/08/26  */

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
   EVENTOS
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

                    const round =
                        button.dataset.f1Round;

                    const roundId =
                        button.dataset.f1RoundId;

                    await loadSession(
                        round,
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
   FORMATO
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
   HEADER
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
   BUSCAR CARRERA ALPHA
========================================================= */

async function findAlphaRace(race) {

    if (!race) return null;

    const alpha =
        await F1.getAlphaSchedule(
            race.season
        );

    console.log(
        "ALPHA SCHEDULE:",
        alpha
    );

    const events =
        alpha?.data?.events ?? [];

    const event =
        events.find(item =>
            Number(item?.round?.number) ===
            Number(race.round)
        );

    if (!event) {

        console.error(
            "No se encontró la ronda en Alpha:",
            race.round
        );

        return null;
    }

    const roundId =
        event?.round?.id;

    if (!roundId) {

        console.error(
            "La ronda existe pero no tiene ID Alpha:",
            event
        );

        return null;
    }

    console.log(
        "ALPHA ROUND ENCONTRADO:",
        roundId
    );

    return {
        roundId,
        event
    };
}



/* =========================================================
   SESIONES DEL FIN DE SEMANA
========================================================= */

function getSessionMap(race) {

    const sessions = [];


    if (race.firstPractice) {

        sessions.push({
            key: "fp1",
            code: "FP1",
            label: "FP1",
            date: race.firstPractice.date,
            time: race.firstPractice.time
        });

    }


    if (race.secondPractice) {

        sessions.push({
            key: "fp2",
            code: "FP2",
            label: "FP2",
            date: race.secondPractice.date,
            time: race.secondPractice.time
        });

    }


    if (race.thirdPractice) {

        sessions.push({
            key: "fp3",
            code: "FP3",
            label: "FP3",
            date: race.thirdPractice.date,
            time: race.thirdPractice.time
        });

    }


    if (race.sprintQualifying) {

        sessions.push({
            key: "sq",
            code: "SQ",
            label: "SPRINT QUALY",
            date: race.sprintQualifying.date,
            time: race.sprintQualifying.time
        });

    }


    if (race.sprint) {

        sessions.push({
            key: "sprint",
            code: "S",
            label: "SPRINT",
            date: race.sprint.date,
            time: race.sprint.time
        });

    }


    if (race.qualifying) {

        sessions.push({
            key: "qualifying",
            code: "Q",
            label: "QUALY",
            date: race.qualifying.date,
            time: race.qualifying.time
        });

    }


    sessions.push({
        key: "race",
        code: "R",
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


    finished.sort((a, b) => {

        const dateA =
            new Date(
                `${a.date}T${a.time || "00:00:00"}`
            );

        const dateB =
            new Date(
                `${b.date}T${b.time || "00:00:00"}`
            );

        return dateB - dateA;

    });


    return finished[0];
}


/* =========================================================
   BOTONES
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
                    data-f1-code="${session.code}"
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
   NORMALIZAR RESULTADOS
========================================================= */

function normalizeResults(data) {

    if (!data) {
        return [];
    }


    /*
     * Nuestros adaptadores Ergast
     * ya devuelven arrays.
     */
    if (Array.isArray(data)) {

        return data;

    }


    /*
     * Alpha
     */
    return (
        data.results ??
        data.Results ??
        data.items ??
        data.data?.results ??
        data.data?.items ??
        data.result ??
        []
    );
}


/* =========================================================
   RESULTADOS
========================================================= */

function renderSessionResults(data) {

    const results =
        normalizeResults(data);


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
                    result.position_number ??
                    result.positionNumber ??
                    index + 1;


                const driver =
                    result.driver ??
                    result.Driver ??
                    {};


                const constructor =
                    result.constructor ??
                    result.Constructor ??
                    result.team ??
                    result.Team ??
                    {};


                const fullName =
                    driver.fullName ??
                    driver.full_name ??
                    `${driver.givenName ?? driver.given_name ?? ""} ${driver.familyName ?? driver.family_name ?? ""}`.trim() ??
                    "—";


                const teamName =
                    constructor.name ??
                    constructor.team_name ??
                    constructor.full_name ??
                    "—";


                const points =
                    result.points ??
                    result.points_earned;


                return `

                    <div class="f1-modal-row">

                        <strong>
                            ${position}
                        </strong>

                        <span>
                            ${fullName}
                        </span>

                        <span>
                            ${teamName}
                        </span>

                        ${
                            points !== undefined &&
                            points !== null
                                ? `<strong>${points} pts</strong>`
                                : ""
                        }

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


    try {

        const race =
            await getRaceFromRound(
                round
            );


        let data = null;

        let currentRoundId =
            roundId ?? null;


        /*
         * RACE
         */
        if (session === "race") {

            data =
                await F1.getResults(
                    "current",
                    round
                );

        }


        /*
         * QUALY
         */
        else if (session === "qualifying") {

            data =
                await F1.getQualifying(
                    "current",
                    round
                );

        }


        /*
         * SPRINT
         */
        else if (session === "sprint") {

            data =
                await F1.getSprint(
                    "current",
                    round
                );

        }


        /*
         * PRACTICE / SPRINT QUALIFYING
         */
        else {

            /*
             * Buscar el round_id de Alpha
             */
            const alphaRace =
                await findAlphaRace(
                    race
                );


            currentRoundId =
                alphaRace?.roundId ??
                currentRoundId ??
                null;


            if (!currentRoundId) {

                throw new Error(
                    "No se encontró round_id de Alpha."
                );

            }


            /*
             * Código de sesión Alpha
             */
            const alphaSessionMap = {

                fp1: "FP1",
                fp2: "FP2",
                fp3: "FP3",
                sq: "SQ"

            };


            const code =
                alphaSessionMap[session];


            if (!code) {

                throw new Error(
                    `Código Alpha desconocido: ${session}`
                );

            }


            /*
             * Obtener resultados desde Alpha
             */
            data =
                await F1.getSessionResults(
                    currentRoundId,
                    code
                );

        }


        const sessions =
            getSessionMap(
                race
            );


        content.innerHTML = `

            ${createRaceHeader(
                race
            )}

            ${createSessionButtons(
                sessions,
                session,
                round,
                currentRoundId
            )}

            ${renderSessionResults(
                data
            )}

        `;


        initModalEvents();

    }

    catch (error) {

        console.error(
            "F1 session error:",
            error
        );


        const race =
            await getRaceFromRound(
                round
            );


        content.innerHTML = `

            ${createRaceHeader(
                race
            )}

            <div class="f1-no-results">

                No se pudieron cargar
                los resultados de esta sesión.

            </div>

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
            Number(race.round) ===
            Number(round)
    );

}


/* =========================================================
   ÚLTIMA CARRERA
========================================================= */

async function createLastRace(race) {

    if (!race) {

        return `
            <h2>🏁 Último Gran Premio</h2>

            <p>
                No hay información disponible.
            </p>
        `;

    }


    const sessions =
        getSessionMap(race);


    /*
     * Predeterminado:
     * última sesión finalizada.
     */
    const selected =
        getLastFinishedSession(
            sessions
        );


    const alphaRace =
        await findAlphaRace(
            race
        );


    const roundId =
        alphaRace?.roundId ??
        null;


    let data = null;


    try {

        if (selected.key === "race") {

            data =
                await F1.getResults(
                    "current",
                    race.round
                );

        }

        else if (
            selected.key ===
            "qualifying"
        ) {

            data =
                await F1.getQualifying(
                    "current",
                    race.round
                );

        }

        else if (
            selected.key ===
            "sprint"
        ) {

            data =
                await F1.getSprint(
                    "current",
                    race.round
                );

        }

        else {

            if (roundId) {

                data =
                    await F1.getSessionResults(
                        roundId,
                        selected.code
                    );

            }

        }

    }

    catch (error) {

        console.error(
            "Last race session error:",
            error
        );

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

async function getModalContent(
    type,
    data
) {

    if (type === "championship") {

        return await createChampionship(
            data
        );

    }


    if (type === "next-race") {

        return createNextRace(
            data
        );

    }


    if (type === "last-race") {

        return await createLastRace(
            data
        );

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


    renderModal(
        content
    );

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


    overlay.classList.remove(
        "show"
    );


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
