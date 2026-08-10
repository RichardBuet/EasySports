import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

let refreshTimer = null;

window.openLiveFullModal = async () => {
console.log("LIVE CLICK");
    const live = await NASCAR.getLiveRace();


openModal({

    title: "NASCAR LIVE MODAL",

    content: await createLiveContent(live),

    onClose: () => {

        clearInterval(refreshTimer);

    }

});

clearInterval(refreshTimer);

refreshTimer = setInterval(refreshLiveFullModal, 5000);


};

async function createLiveContent(live) {

    return `

        <div class="live-summary">

            <div class="live-item">
                <span>📋 Sesión</span>
                <strong>${live.sessionName}</strong>
            </div>

            <div class="live-item">
                <span>🏟 Circuito</span>
                <strong>${live.track}</strong>
            </div>

            <div class="live-item">
                <span>📏 Longitud</span>
                <strong>${live.trackLength} mi</strong>
            </div>

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

            ${live.stage ? `
                <div class="live-item">
                    <span>🏆 Stage</span>
                    <strong>${live.stage.number}</strong>
                </div>

                <div class="live-item">
                    <span>🏁 Final Stage</span>
                    <strong>V${live.stage.finishLap}</strong>
                </div>

                <div class="live-item">
                    <span>⌛ Restan Stage</span>
                    <strong>${live.stage.lapsRemaining}</strong>
                </div>
            ` : ""}

            <div class="live-item">
                <span>👑 Líderes</span>
                <strong>${live.leaders}</strong>
            </div>

            <div class="live-item">
                <span>🔄 Lead Changes</span>
                <strong>${live.leadChanges}</strong>
            </div>

            <div class="live-item">
                <span>⚠️ Cautions</span>
                <strong>${live.cautions}</strong>
            </div>

            <div class="live-item">
                <span>🟨 Caution Laps</span>
                <strong>${live.cautionLaps}</strong>
            </div>

        </div>

        <div class="driver-header">

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

        <div class="driver-list">

            ${live.leaderboard.map(driver => `

                <div class="driver-row">

                    <span>${driver.position}</span>

                    <span>${driver.number}</span>

                    <span>

                        <strong>${driver.driver}</strong><br>

                        <small>${driver.sponsor}</small><br>

                        <small>${driver.manufacturer}</small>

                    </span>

                    <span>${driver.delta}</span>

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

            `).join("")}

        </div>

    `;

}


async function refreshLiveFullModal() {

    const live = await NASCAR.getLiveRaceData();

    const body = document.querySelector(".modal-body");

    if (!body) return;

    // Guardar posición actual del scroll
    const scrollPosition = body.scrollTop;

    // Actualizar contenido
    body.innerHTML = await createLiveContent(live);

    // Recuperar posición del scroll
    body.scrollTop = scrollPosition;

}
