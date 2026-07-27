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

    refreshTimer = setInterval(refreshLiveModal, 50000);

}

window.openLiveRaceModal = openLiveRaceModal;

async function createLiveContent(live) {

    return `

        <div class="live-summary-full">

            <div class="live-item-full">
                <span>🏁 Lap</span>
                <strong>${live.summary.lap} / ${live.summary.totalLaps}</strong>
            </div>

            <div class="live-item-full">
                <span>🏳️ Flag</span>
                <strong>${live.summary.flag}</strong>
            </div>

            <div class="live-item-full">
                <span>⚡ Speed</span>
                <strong>${live.liveFeed.series}</strong>
            </div>

        </div>

        <div class="driver-header-full">

            <span>POS</span>
            <span>#</span>
            <span>DRIVER</span>
            <span>LAST</span>
            <span>BEST</span>
            <span>PITS</span>

        </div>

        <div class="driver-list-full">

            ${live.leaderboard.map(driver => {

                const lap = live.lapTimes.laps.find(
                    d => d.vehicle_number == driver.vehicle_number
                );

                return `

                    <div class="driver-row-full">

                        <span>${driver.running_position}</span>

                        <span>${driver.vehicle_number}</span>

                        <span>${driver.driver_name}</span>

                        <span>${lap?.last_lap_time ?? "-"}</span>

                        <span>${lap?.best_lap_time ?? "-"}</span>

                        <span>${driver.pit_stops}</span>

                    </div>

                `;

            }).join("")}

        </div>

    `;

}

async function refreshLiveModal() {

    const live = await NASCAR.getLiveRaceData();

    const body = document.querySelector(".modal-body");

    if (!body) return;

    body.innerHTML = await createLiveContent(live);

}
