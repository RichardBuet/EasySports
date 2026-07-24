import { openModal } from "../components/modal.js";

export function showDriverModal(driver) {
    openModal({
        title: "",
        content: `
            ${renderHeader(driver)}
            ${renderStats(driver)}
            ${renderProfile(driver)}
        `
    });
}

function renderHeader(driver) {
    return `
        <section class="driver-modal-header">
            <img
                src="${driver.profile.image}"
                alt="${driver.driver}"
                class="driver-photo">
            <div class="driver-info">
                <h2>${driver.driver}</h2>
                <p>#${driver.number}</p>
                <p>${driver.profile.team}</p>
                <p>${driver.manufacturer}</p>
            </div>
        </section>
    `;
}

function renderStats(driver) {
    return `
        <section class="driver-stats">
            <h3>Campeonato</h3>
            <div class="driver-grid">
                <span>Posición</span>
                <strong>${driver.position}</strong>
                <span>Puntos</span>
                <strong>${driver.points}</strong>
                <span>Victorias</span>
                <strong>${driver.wins}</strong>
                <span>Top 5</span>
                <strong>${driver.top5}</strong>
                <span>Top 10</span>
                <strong>${driver.top10}</strong>
                <span>Poles</span>
                <strong>${driver.poles}</strong>
                <span>Vueltas lideradas</span>
                <strong>${driver.lapsLed}</strong>
                <span>Stage Points</span>
                <strong>${driver.stagePoints}</strong>
            </div>
        </section>
    `;
}

function renderProfile(driver) {
    return `
        <section class="driver-profile"
            <h3>Perfil</h3>
            <div class="driver-grid">
                <span>Equipo</span>
                <strong>${driver.profile.team}</strong>
                <span>Crew Chief</span>
                <strong>${driver.profile.crewChief}</strong>
                <span>Rookie</span>
                <strong>${driver.profile.rookieYear}</strong>
                <span>Nacimiento</span>
                <strong>${driver.profile.birthDate}</strong>
                <span>Ciudad</span>
                <strong>${driver.profile.hometown.city}</strong>
                <span>Estado</span>
                <strong>${driver.profile.hometown.state}</strong>
                <span>País</span>
                <strong>${driver.profile.hometown.country}</strong>
            </div>
        </section>
    `;
}
