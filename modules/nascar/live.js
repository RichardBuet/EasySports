import { NASCAR } from "../../services/site.js";

import { openModal } from "../components/modal.js";

window.openLiveRace = async () => {
console.log("LIVE CLICK");
    const live = await NASCAR.getLiveRace();

    openModal({

        title: "NASCAR LIVE",

        content: await createLiveContent(live)

    });

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

    `;

}
