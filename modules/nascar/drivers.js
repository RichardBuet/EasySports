import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

export async function createDrivers() {
    // <div class="raceCenter">   </div>
    const drivers = await NASCAR.getStandingsWithDrivers();

    const top5 = drivers.slice(0, 5);

    return `
        <section class="driversCard">
        <h2 class="h2-NSC">Campeonato de pilotos</h2>
         

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

            <button
                class="btn-nsc"
                onclick="window.openDriverStandings()">
                Ver campeonato completo ▼
            </button>
            
            </div>


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
                <span>PILOTO</span>
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
