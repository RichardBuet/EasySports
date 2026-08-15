import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";
import { showDriverModal } from "./driverModal.js";





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
                <span></span>
                <span>PTS</span>

            </div>

                ${top5.map(driver => `
                    <div class="driver-row">
                        <span>#${driver.position}</span>
                        
 <span class="nascar-driver-number">
    ${
        driver.profile?.badge
            ? `<img
                src="${driver.profile.badge}"
                alt="#${driver.number}"
                loading="lazy"
            >`
            : `#${driver.number}`
    }
</span>


                        <span
                            class="driver-link"
                            data-driver-id="${driver.driverId}">
                        
                            <strong>${driver.driver}</strong>
                        
                            ${driver.profile?.team
                                ? `<small>${driver.profile.team}</small>`
                                : ""}
                        
                        </span>
                        
                        <span class="manufacturer-cell">
                            ${driver.profile?.manufacturerLogo
                                ? `<img
                                    class="manufacturer-logo"
                                    src="${driver.profile.manufacturerLogo}"
                                    alt="${driver.profile.manufacturer}">`
                                : ""}
                        </span>
                        
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
                <span></span>
                <span>PTS</span>
            </div>
        
            <div class="driver-list">
                ${drivers.map(driver => `
                    <div class="driver-row">
                        <span>#${driver.position}</span>
                        
 <span class="nascar-driver-number">
    ${
        driver.profile?.badge
            ? `<img
                src="${driver.profile.badge}"
                alt="#${driver.number}"
                loading="lazy"
            >`
            : `#${driver.number}`
    }
</span>

                        <span
                            class="driver-link"
                            data-driver-id="${driver.driverId}">
                        
                            <strong>${driver.driver}</strong>
                        
                            ${driver.profile?.team
                                ? `<small>${driver.profile.team}</small>`
                                : ""}
                        
                        </span>
                        
                        <span class="manufacturer-cell">
                            ${driver.profile?.manufacturerLogo
                                ? `<img
                                    class="manufacturer-logo"
                                    src="${driver.profile.manufacturerLogo}"
                                    alt="${driver.profile.manufacturer}">`
                                : ""}
                        </span>
                        
                        <strong>${driver.points}</strong>
                    </div>
                `).join("")}
            </div>
        `

    });

};

document.addEventListener("click", async (event) => {

    const link = event.target.closest(".driver-link");

    if (!link) return;

    const driver = await NASCAR.getDriver(
        link.dataset.driverId
    );

    if (driver) {
        showDriverModal(driver);
    }

});
