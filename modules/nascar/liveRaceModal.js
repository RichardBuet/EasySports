import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

let refreshTimer = null;

export async function openLiveRaceModal() {

    const live = await NASCAR.getLiveRaceData();

    openModal({

        title: "🏁NASCAR Race Center",

        content: await createLiveContent(live),

        onClose: () => clearInterval(refreshTimer)

    });

    clearInterval(refreshTimer);
// actuaalización cada 10 segundos 
    // Formato de encabezado 4 datos superior
    refreshTimer = setInterval(refreshLiveModal, 10000);

}

window.openLiveRaceModal = openLiveRaceModal;

async function createLiveContent(live) {

    return `
    
<div class="live-summary-compact">

    <div class="live-item-compact">
        <span>🏁 Series</span>
        <strong>${live.summary.series}</strong>
    </div>

    <div class="live-item-compact">
        <span>${live.summary.session.icon}</span>
        <strong>${live.summary.session.name}</strong>
    </div>

    <div class="live-item-compact">
        <span>${live.summary.flag.icon}</span>
        <strong>${live.summary.flag.name}</strong>
    </div>

    <div class="live-item-compact">
        <span>🏁 Lap</span>
        <strong>${live.summary.lap}</strong>
    </div>

</div>

        <div class="driver-header-compact">

           <span>POS</span>
<span>#</span>
<span>DRIVER</span>
<span>GAP</span>
<span>LAST / BEST</span>
<span>PITS</span>

        </div>

        <div class="driver-list-compact">

          ${live.leaderboard.map(driver => `

    <div class="driver-row-compact">

        <span>${driver.position}</span>

        <span>${driver.number}</span>

        <span>
            <strong>${driver.driver}</strong>
            <small>${driver.sponsor}</small>
        </span>

        <span>${driver.gap.toFixed(3)}</span>

        <span>
    ${driver.lastLap.toFixed(3)}
    <small>${driver.bestLap.toFixed(3)}</small>
</span>

        <span>${driver.pitStops}</span>

    </div>

`).join("")}

        </div>

    `;

}

async function refreshLiveModal() {

    const live = await NASCAR.getLiveRaceData();

    const driverList = document.querySelector(".driver-list-compact");

    if (!driverList) return;

    driverList.innerHTML = live.leaderboard.map(driver => `

        <div class="driver-row-compact">

            <span>${driver.position}</span>

            <span>${driver.number}</span>

            <span>
                <strong>${driver.driver}</strong>
                <small>${driver.sponsor}</small>
            </span>

            <span>${driver.gap.toFixed(3)}</span>

            <span>
                ${driver.lastLap.toFixed(3)}
                <small>${driver.bestLap.toFixed(3)}</small>
            </span>

            <span>${driver.pitStops}</span>

        </div>

    `).join("");

}
