import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

window.openRaceResult = async () => {

    const race = await NASCAR.getCurrentWeekend();

    openModal({

        title: "Resultado de la carrera",

        content: await createRaceResultContent(race)

    });
};

async function createRaceResultContent(race){
console.log(race.leaderboard[0]);
    return `

<div class="live-summary-full">

    <div class="live-item">
        <span>📍 Circuito</span>
        <strong>${race.track}</strong>
    </div>
    
    <div class="live-item-full">
        <span>🏁 Serie</span>
        <strong>${race.series}</strong>
    </div>



    <div class="live-item-full">
        <span>🟡 Amarillas</span>
        <strong>${race.cautions}</strong>
    </div>

    <div class="live-item-full">
        <span>⚡ Promedio</span>
        <strong>${race.averageSpeed} mph</strong>
    </div>

    <div class="live-item-full">
        <span>🏆 Margen</span>
        <strong>${race.margin} s</strong>
    </div>

</div>

        <div class="driver-header">

            <span>POS</span>

            <span>#</span>

            <span>PILOTOS</span>
            
            <span>GAP</span>

            <span>PTS</span>

        </div>

        <div class="driver-list">

            ${race.leaderboard.map(driver => `

                <div class="driver-row">

                    <span>#${driver.position}</span>

                    <span>${driver.number}</span>

<span
    class="driver-link"
    data-driver-id="${driver.driverId}">

    <strong>
        ${driver.driver}

        ${driver.manufacturerLogo
            ? `<img
                class="manufacturer-logo"
                src="${driver.manufacturerLogo}"
                alt="">`
            : ""}
    </strong>

    ${driver.team
        ? `<small>${driver.team}</small>`
        : ""}

</span>


                    <span class="driver-gap">${driver.gap}</span>

                    <strong>${driver.points}</strong>

                </div>

            `).join("")}

        </div>

    `;

}
