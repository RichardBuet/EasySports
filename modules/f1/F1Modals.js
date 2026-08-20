/* MODALS F1 ALL INCLUSIVE */
import { F1 } from "../../services/siteF1.js";

let modalStack = [];

function createModal(content) {
    return `
        <div class="f1-modal-overlay">
            <div class="f1-modal">
                <button class="f1-modal-close" type="button">×</button>
                <div class="f1-modal-content">
                    ${content}
                </div>
            </div>
        </div>
    `;
}

function renderModal(content) {
    document.querySelector(".f1-modal-overlay")?.remove();

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

async function getChampionshipContent(type) {
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

async function getModalContent(type, data) {
    if (type === "championship") {
        return await getChampionshipContent(data);
    }

    if (type === "next-race") {
        return `
            <h2>📅 Próximo Gran Premio</h2>
            <p>Información del próximo evento.</p>
        `;
    }

    if (type === "last-race") {
        return `
            <h2>🏁 Último Gran Premio</h2>
            <p>Resultados del fin de semana.</p>
        `;
    }

    return `
        <h2>🏎️ Formula 1</h2>
    `;
}

export async function openF1Modal(type, data = null) {
    modalStack.push({
        type,
        data
    });

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

export async function backF1Modal() {
    if (modalStack.length <= 1) {
        closeF1Modal();
        return;
    }

    modalStack.pop();

    const previous = modalStack[modalStack.length - 1];

    const content = await getModalContent(
        previous.type,
        previous.data
    );

    renderModal(content);
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeF1Modal();
    }
});
