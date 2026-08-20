/* MODALS F1 ALL INCLUSIVE */


import { F1 } from "../../services/siteF1.js";

let modalStack = [];

function createModal(content) {
    return `
        <div class="f1-modal-overlay">
            <div class="f1-modal">
                <button class="f1-modal-close" type="button" aria-label="Cerrar">×</button>
                <div class="f1-modal-content">
                    ${content}
                </div>
            </div>
        </div>
    `;
}

function renderModal(content) {
    document.querySelector(".f1-modal-overlay")?.remove();
    document.body.insertAdjacentHTML("beforeend", createModal(content));
    requestAnimationFrame(() => {
        document.querySelector(".f1-modal-overlay")?.classList.add("show");
    });
    initModalEvents();
}

function initModalEvents() {
    const overlay = document.querySelector(".f1-modal-overlay");
    const close = document.querySelector(".f1-modal-close");
    if (!overlay || !close) return;
    close.addEventListener("click", closeF1Modal);
    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeF1Modal();
        }
    });
}

async function createChampionship(type) {
    if (type === "drivers") {
        const standings = await F1.getStandings();
        return `
            <h2>🏎️ Campeonato de Pilotos</h2>
            <div class="f1-modal-list">
                ${standings.map(driver => `
                    <div class="f1-modal-row">
                        <strong>${driver.position}</strong>
                        <span>${driver.driver.fullName}</span>
                        <span>${driver.constructor.name}</span>
                        <strong>${driver.points} pts</strong>
                    </div>
                `).join("")}
            </div>
        `;
    }
    const constructors = await F1.getConstructorStandings();
    return `
        <h2>🏆 Campeonato de Constructores</h2>
        <div class="f1-modal-list">
            ${constructors.map(team => `
                <div class="f1-modal-row">
                    <strong>${team.position}</strong>
                    <span>${team.constructor.name}</span>
                    <span>${team.wins} victorias</span>
                    <strong>${team.points} pts</strong>
                </div>
            `).join("")}
        </div>
    `;
}

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
    const day = new Date(`${date}T12:00:00`).getDay();
    return days[day];
}

function createRaceHeader(race) {
    return `
        <div class="f1-race-info">
            <h2>📅 ${race.raceName}</h2>
            <p>${race.circuit?.name ?? "—"}</p>
            <p>🇳🇱 ${race.circuit?.location?.country ?? "—"}</p>
            <strong>ROUND ${race.round}</strong>
        </div>
    `;
}

function createNextRace(race) {
    if (!race) {
        return `
            <h2>📅 Próximo Gran Premio</h2>
            <p>No hay información disponible.</p>
        `;
    }

    return `
        ${createRaceHeader(race)}
        <div class="f1-race-schedule">
            ${race.firstPractice ? `
                <div class="f1-session">
                    <span>📅</span>
                    <div>
                        <strong>${formatDay(race.firstPractice.date)}</strong>
                        <span>FP1</span>
                    </div>
                    <time>${formatTime(race.firstPractice.time)}</time>
                </div>
            ` : ""}
            ${race.qualifying ? `
                <div class="f1-session">
                    <span>⚡</span>
                    <div>
                        <strong>${formatDay(race.qualifying.date)}</strong>
                        <span>Qualifying</span>
                    </div>
                    <time>${formatTime(race.qualifying.time)}</time>
                </div>
            ` : ""}
            <div class="f1-session">
                <span>🏁</span>
                <div>
                    <strong>${formatDay(race.date)}</strong>
                    <span>Race</span>
                </div>
                <time>${formatTime(race.time)}</time>
            </div>
        </div>
    `;
}

async function createLastRace(race) {
    if (!race) {
        return `
            <h2>🏁 Último Gran Premio</h2>
            <p>No hay información disponible.</p>
        `;
    }

    const results = await F1.getResults("current", race.round);

    return `
        ${createRaceHeader(race)}
        <div class="f1-session-selector">
            <button class="active">RACE</button>
            ${race.qualifying ? `<button>QUALY</button>` : ""}
            ${race.thirdPractice ? `<button>FP3</button>` : ""}
            ${race.secondPractice ? `<button>FP2</button>` : ""}
            ${race.firstPractice ? `<button>FP1</button>` : ""}
            ${race.sprint ? `<button>SPRINT</button>` : ""}
        </div>
        <div class="f1-session-content">
            ${results.map(result => `
                <div class="f1-modal-row">
                    <strong>${result.position}</strong>
                    <span>${result.driver.fullName}</span>
                    <span>${result.constructor.name}</span>
                    <strong>${result.points} pts</strong>
                </div>
            `).join("")}
        </div>
    `;
}

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
    return `<h2>🏎️ Formula 1</h2>`;
}

export async function openF1Modal(type, data = null) {
    modalStack.push({ type, data });
    const content = await getModalContent(type, data);
    renderModal(content);
}

export function closeF1Modal() {
    const overlay = document.querySelector(".f1-modal-overlay");
    if (!overlay) return;
    overlay.classList.remove("show");
    setTimeout(() => {
        overlay.remove();
        modalStack.pop();
    }, 250);
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeF1Modal();
    }
});
