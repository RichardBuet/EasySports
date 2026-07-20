import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

export async function createDrivers() {

    const drivers = await NASCAR.getStandingsWithDrivers();

    const top5 = drivers.slice(0, 5);

    return `
        <section class="widget">

            <div class="widget-header">

                <h2>Driver Standings</h2>

                <button
                    class="widget-link"
                    onclick="window.openDriverStandings()">
                    Ver más
                </button>

            </div>

            <div class="driver-list">

                ${top5.map(driver => `

                    <div class="driver-row">

                        <span>#${driver.position}</span>

                        <span>${driver.number}</span>

                        <span>${driver.driver}</span>

                        <strong>${driver.points}</strong>

                    </div>

                `).join("")}

            </div>

        </section>
    `;

}

window.openDriverStandings = async () => {

    const drivers = await NASCAR.getStandingsWithDrivers();

    openModal({

        title: "Driver Standings",

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
