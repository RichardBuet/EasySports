import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

export async function createDrivers() {

    const drivers = await NASCAR.getStandingsWithDrivers();

    const top5 = drivers.slice(0, 5);

    return `
        <section class="driverCard">

            <div class="raceCenter">
                <h2>Campeonato de pilotos</h2>
            </div>

            <div class="driver-header">
                <span>POS</span>
                <span>N°</span>
                <span>DRIVER</span>
                <span>PTS</span>

            </div>

                ${top5.map(driver => `
                    <div class="driver-row">
                        <span>#${driver.position}</span>
                        <span>${driver.number}</span>
                        <span>${driver.driver}</span>
                        <strong>${driver.points}</strong>
                    </div>
                `).join("")}

            </div>

            <button
                class="btn-nsc"
                onclick="window.openDriverStandings()">
                Ver campeonato completo ▼
            </button>
        </section>
    `;

}

window.openDriverStandings = async () => {
    const drivers = await NASCAR.getStandingsWithDrivers();
    openModal({
        title: "Campeonato de pilotos",
        content: `
            <div class="driver-header">
                <span>POS</span>
                <span>N°</span>
                <span>DRIVER</span>
                <span>PTS</span>
            </div>
        
            <div class="driver-list">
                ${drivers.map(driver => `
                    <div class="driver-row">
                        <span>#${driver.position}</span>
                        <span>${driver.number}</span>
                        <span>${driver.driver}</span>
                        <strong>${driver.points}</strong>
                    </div>
                `).join("")}
            </div>
        `

    });

};
