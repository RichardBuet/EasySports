import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

let refreshTimer = null;

export async function openLiveRaceModal() {

    const live = await NASCAR.getLiveRaceData();

    openModal({

        title: "🏁 NASCAR Race Center",

        content: await createLiveContent(live),

        onClose: () => clearInterval(refreshTimer)

    });

    clearInterval(refreshTimer);

    //refreshTimer = setInterval(refreshLiveModal, 50000);

}

window.openLiveRaceModal = openLiveRaceModal;

async function createLiveContent(live) {

    return `
    
        <div class="live-summary-full">
            <div class="live-item-full">
                <span>🏁 Series</span>
                <strong>${live.summary.series}</strong>
                 <small>${live.summary.session}</small>
            </div>
        
<div class="live-item-full">
    <span>${live.summary.flag.icon}</span>
    <strong>${live.summary.flag.name}</strong>
</div>
        
<div class="live-item-full">
    <span>🏁 Lap</span>
    <strong>${live.summary.lap}</strong>
</div>

        </div>

        <div class="driver-header-full">

           <span>POS</span>
<span>#</span>
<span>DRIVER</span>
<span>GAP</span>
<span>LAST / BEST</span>
<span>PITS</span>

        </div>

        <div class="driver-list-full">

          ${live.leaderboard.map(driver => `

    <div class="driver-row-full">

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

    const body = document.querySelector(".modal-body");

    if (!body) return;

    body.innerHTML = await createLiveContent(live);

}
