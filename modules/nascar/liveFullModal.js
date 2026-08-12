import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

let refreshTimer = null;

window.openLiveFullModal = async () => {

    const live = await NASCAR.getLiveRaceData();

    openModal({

        title: "🏁 NASCAR LIVE v5",

        content: await createLiveContent(live),

        onClose: () => {
            clearInterval(refreshTimer);
        }

    });

    clearInterval(refreshTimer);

    // Actualización cada 5 segundos
    refreshTimer = setInterval(refreshLiveFullModal, 5000);

};


/* =========================================================
   CONTENIDO
   ========================================================= */

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
                <span>${live.summary.flag.icon}</span>
                <strong>${live.summary.flag.name}</strong>
            </div>

            <div class="live-item-full">
                <span>🏁 Lap</span>
                <strong>${live.summary.lap}</strong>
            </div>

        </div>


        <div class="live-table-full">

            <div class="driver-header-full">

                <span>POS</span>
                <span>#</span>
                <span>DRIVER</span>
                <span>GAP</span>
                <span>LAST</span>
                <span class="pur">BEST</span>
                <span>AVG</span>
                <span>LED</span>
                <span class="pur">FAST</span>
                <span>GAIN</span>
                <span>START</span>
                <span>PITS</span>
                <span>STATUS</span>

            </div>


            <div class="driver-list-full">

                ${createDriverRows(live.leaderboard)}

            </div>

        </div>

    `;

}


/* =========================================================
   FILAS DE PILOTOS
   ========================================================= */

function createDriverRows(leaderboard) {

    return leaderboard.map(driver => {

        const statusClass =
            driver.onTrack
                ? "status-live"
                : "status-off";

        return `

            <div class="driver-row-full">

                <span>
                    ${driver.position}
                </span>


                <span>
                    ${driver.number}
                </span>


                <span>

                    <strong>
                        ${driver.driver}
                    </strong>

                    <small>
                        ${driver.sponsor}
                    </small>

                    <small>
                        ${driver.manufacturer}
                    </small>

                </span>


                <span class="gap">
                    ${driver.gap}
                </span>


                <span>
                    ${driver.lastLap}
                </span>


                <span class="best pur">
                    ${driver.bestLap}
                </span>


                <span>
                    ${Number(driver.averageSpeed).toFixed(3)}
                </span>


                <span>
                    ${driver.lapsLed}
                </span>


                <span class="fast pur">
                    ${driver.fastestLaps}
                </span>


                <span class="gain">
                    ${driver.positionGain > 0
                        ? `+${driver.positionGain}`
                        : driver.positionGain}
                </span>


                <span>
                    ${driver.startingPosition}
                </span>


                <span>
                    ${driver.pitStops}
                </span>


                <span class="${statusClass}">

                    ${driver.onTrack ? "🟢" : "🔴"}

                    ${driver.onDVP ? "⚠️" : ""}

                </span>

            </div>

        `;

    }).join("");

}


/* =========================================================
   REFRESH
   ========================================================= */

async function refreshLiveFullModal() {

    const live = await NASCAR.getLiveRaceData();

    /*
       El scroll horizontal está en .live-table-full
       El scroll vertical del listado está en .driver-list-full
    */

    const table = document.querySelector(".live-table-full");
    const driverList = document.querySelector(".driver-list-full");

    if (!table || !driverList) return;


    /* Guardar posiciones */

    const horizontalScroll = table.scrollLeft;
    const verticalScroll = driverList.scrollTop;


    /* Actualizar SOLO las filas */

    driverList.innerHTML =
        createDriverRows(live.leaderboard);


    /* Recuperar posiciones */

    table.scrollLeft = horizontalScroll;

    driverList.scrollTop = verticalScroll;

}
