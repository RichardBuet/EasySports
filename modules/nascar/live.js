import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

let refreshTimer = null;

window.openLiveRace = async () => {
console.log("LIVE CLICK");
    const live = await NASCAR.getLiveRace();


openModal({

    title: "NASCAR LIVE",

    content: await createLiveContent(live),

    onClose: () => {

        clearInterval(refreshTimer);

    }

});

clearInterval(refreshTimer);

refreshTimer = setInterval(refreshLiveModal, 15000);


};

async function createLiveContent(live){

 return `

    <div class="live-summary">

        <div class="live-item">
            <span>🏳️ Bandera</span>
            <strong>${live.flag}</strong>
        </div>

        <div class="live-item">
            <span>🏁 Vuelta</span>
            <strong>${live.lap} / ${live.totalLaps}</strong>
        </div>

        <div class="live-item">
            <span>⏳ Restan</span>
            <strong>${live.lapsToGo}</strong>
        </div>

    </div>

    <div class="driver-header">

        <span>POS</span>

        <span>#</span>

        <span>DRIVER</span>

        <span>GAP</span>

    </div>

    <div class="driver-list">

        ${live.leaderboard.map(driver => `

            <div class="driver-row">

                <span>#${driver.position}</span>

                <span>${driver.number}</span>

                <span>${driver.driver}</span>

                <strong>${driver.delta}</strong>

            </div>

        `).join("")}

    </div>

`;

}


async function refreshLiveModal() {

    const live = await NASCAR.getLiveRace();

    const body = document.querySelector(".modal-body");

    if (!body) return;

    body.innerHTML = await createLiveContent(live);

}
