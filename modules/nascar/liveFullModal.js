import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

let refreshTimer = null;

window.openLiveFullModal = async () => {

    const live = await NASCAR.getLiveRaceData();

    openModal({

        title: "🏁 NASCAR LIVE",

        content: await createLiveContent(live),

        onClose: () => {
            clearInterval(refreshTimer);
        }

    });

    clearInterval(refreshTimer);

    // Actualización cada 10 segundos
  //  refreshTimer = setInterval(refreshLiveFullModal, 10000);

};


async function createLiveContent(live) {

    return `

        <div class="live-summary-full">

            <div class="live-item-full">
                <span>🏁 Series</span>
                <strong>${live.summary.series}</strong>
            </div>

            <div class="live-item-full">
                <span>${live.summary.session.icon}</span>
                <strong>${live.summary.session.name}</strong>
            </div>

            <div class="live-item-full">
                <span>🏟 Circuito</span>
                <strong>${live.summary.track}</strong>
            </div>

            <div class="live-item-full">
                <span>📏 Longitud</span>
                <strong>${live.summary.trackLength} mi</strong>
            </div>

            <div class="live-item-full">
                <span>${live.summary.flag.icon}</span>
                <strong>${live.summary.flag.name}</strong>
            </div>

            <div class="live-item-full">
                <span>🏁 Vuelta</span>
                <strong>${live.summary.lap}</strong>
            </div>

            <div class="live-item-full">
                <span>⏳ Restan</span>
                <strong>${live.summary.lapsToGo}</strong>
            </div>

            ${live.summary.stage ? `

                <div class="live-item-full">
                    <span>🏆 Stage</span>
                    <strong>${live.summary.stage.number}</strong>
                </div>

                <div class="live-item-full">
                    <span>🏁 Final Stage</span>
                    <strong>V${live.summary.stage.finishLap}</strong>
                </div>

                <div class="live-item-full">
                    <span>⌛ Restan Stage</span>
                    <strong>${live.summary.stage.lapsRemaining}</strong>
                </div>

            ` : ""}

            <div class="live-item-full">
                <span>👑 Líderes</span>
                <strong>${live.summary.leaders}</strong>
            </div>

            <div class="live-item-full">
                <span>🔄 Lead Changes</span>
                <strong>${live.summary.leadChanges}</strong>
            </div>

            <div class="live-item-full">
                <span>⚠️ Cautions</span>
                <strong>${live.summary.cautions}</strong>
            </div>

            <div class="live-item-full">
                <span>🟨 Caution Laps</span>
                <strong>${live.summary.cautionLaps}</strong>
            </div>

        </div>


        <div class="driver-table-full">

            <div class="driver-header-full">

                <span>POS</span>
                <span>#</span>
                <span>DRIVER</span>
                <span>GAP</span>
                <span>LAST</span>
                <span>BEST</span>
                <span>AVG</span>
                <span>LED</span>
                <span>FAST</span>
                <span>GAIN</span>
                <span>START</span>
                <span>PITS</span>
                <span>STATUS</span>

            </div>


            <div class="driver-list-full">

                ${live.leaderboard.map(driver => `

                    <div class="driver-row-full">

                        <span>${driver.position}</span>

                        <span>${driver.number}</span>

                        <span>

                            <strong>${driver.driver}</strong>

                            <small>${driver.sponsor}</small>

                            <small>${driver.manufacturer}</small>

                        </span>

                        <span>${driver.gap.toFixed(3)}</span>

                        <span>${driver.lastLap.toFixed(3)}</span>

                        <span>${driver.bestLap.toFixed(3)}</span>

                        <span>${driver.averageSpeed.toFixed(3)}</span>

                        <span>${driver.lapsLed}</span>

                        <span>${driver.fastestLaps}</span>

                        <span>+${driver.positionGain}</span>

                        <span>${driver.startingPosition}</span>

                        <span>${driver.pitStops}</span>

                        <span>

                            ${driver.onTrack ? "🟢" : "🔴"}

                            ${driver.onDVP ? "⚠️" : ""}

                        </span>

                    </div>

                `).join("")}

            </div>

        </div>

    `;

}
async function refreshLiveFullModal() {

    const live = await NASCAR.getLiveRaceData();

    const driverList = document.querySelector(".driver-list-full");

    if (!driverList) return;

    const scrollTop = driverList.scrollTop;
    const scrollLeft = driverList.scrollLeft;

    driverList.innerHTML = live.leaderboard.map(driver => `

        <div class="driver-row-full">

            <span>${driver.position}</span>

            <span>${driver.number}</span>

            <span>
                <strong>${driver.driver}</strong>
                <small>${driver.sponsor}</small>
                <small>${driver.manufacturer}</small>
            </span>

            <span>${driver.gap}</span>

            <span>${driver.lastLap}</span>

            <span>${driver.bestLap}</span>

            <span>${driver.averageSpeed.toFixed(3)}</span>

            <span>${driver.lapsLed}</span>

            <span>${driver.fastestLaps}</span>

            <span>+${driver.positionGain}</span>

            <span>${driver.startingPosition}</span>

            <span>${driver.pitStops}</span>

            <span>
                ${driver.onTrack ? "🟢" : "🔴"}
                ${driver.onDVP ? "⚠️" : ""}
            </span>

        </div>

    `).join("");

    driverList.scrollTop = scrollTop;
    driverList.scrollLeft = scrollLeft;
}

