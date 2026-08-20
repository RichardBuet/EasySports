import { F1 } from "../../services/siteF1.js";
import { openF1Modal } from "./F1Modals.js";

function createDashboardCard(title, value, subtitle, icon, modalType, modalData = null) {
    const modalId = modalData ? `f1-modal-${modalType}` : "";
    if (modalData) {
        window.f1ModalData = window.f1ModalData || {};
        window.f1ModalData[modalId] = modalData;
    }
    return `
        <article
            class="f1-dashboard-card"
            data-f1-modal="${modalType}"
            data-f1-modal-id="${modalId}"
        >
            <span class="f1-dashboard-card__icon">${icon}</span>
            <span class="f1-dashboard-card__title">${title}</span>
            <h3 class="f1-dashboard-card__value">${value}</h3>
            <span class="f1-dashboard-card__subtitle">${subtitle}</span>
        </article>
    `;
}

function getNextRace(schedule) {
    const now = new Date();
    return schedule
        .filter(race => {
            const raceDate = new Date(`${race.date}T${race.time || "00:00:00"}`);
            return raceDate >= now;
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time || "00:00:00"}`);
            const dateB = new Date(`${b.date}T${b.time || "00:00:00"}`);
            return dateA - dateB;
        })[0] ?? null;
}

function getLastRace(schedule) {
    const now = new Date();
    return schedule
        .filter(race => {
            const raceDate = new Date(`${race.date}T${race.time || "00:00:00"}`);
            return raceDate < now;
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time || "00:00:00"}`);
            const dateB = new Date(`${b.date}T${b.time || "00:00:00"}`);
            return dateB - dateA;
        })[0] ?? null;
}

export async function createDashboard() {
    const [
        standings,
        constructors,
        schedule
    ] = await Promise.all([
        F1.getStandings(),
        F1.getConstructorStandings(),
        F1.getSchedule()
    ]);

    const driverLeader = standings[0];
    const constructorLeader = constructors[0];
    const nextRace = getNextRace(schedule);
    const lastRace = getLastRace(schedule);

    return `
        <section class="section f1-dashboard">
            <div class="f1-dashboard-grid">
                ${createDashboardCard(
                    "Driver Leader",
                    driverLeader?.driver.fullName ?? "—",
                    `${driverLeader?.points ?? "—"} pts`,
                    "🏎️",
                    "championship",
                    "drivers"
                )}
                ${createDashboardCard(
                    "Constructor Leader",
                    constructorLeader?.constructor.name ?? "—",
                    `${constructorLeader?.points ?? "—"} pts`,
                    "🏆",
                    "championship",
                    "constructors"
                )}
                ${createDashboardCard(
                    "Next Race",
                    nextRace?.raceName ?? "—",
                    nextRace ? `Round ${nextRace.round}` : "—",
                    "📅",
                    "next-race",
                    nextRace
                )}
                ${createDashboardCard(
                    "Last Race",
                    lastRace?.raceName ?? "—",
                    lastRace ? `Round ${lastRace.round}` : "—",
                    "🏁",
                    "last-race",
                    lastRace
                )}
            </div>
        </section>
    `;
}

export function initF1DashboardModals() {
    document
        .querySelectorAll("[data-f1-modal]")
        .forEach(card => {
            card.addEventListener("click", () => {
                const type = card.dataset.f1Modal;
                const modalId = card.dataset.f1ModalId;
                const data = modalId
                    ? window.f1ModalData?.[modalId]
                    : null;
                openF1Modal(type, data);
            });
        });
}
