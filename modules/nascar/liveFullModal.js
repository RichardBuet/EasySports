import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

let refreshTimer = null;


/* =========================================================
   OPEN NASCAR LIVE FULL MODAL
   ========================================================= */

window.openLiveFullModal = async () => {

    try {

        const live = await NASCAR.getLiveRaceData();

        openModal({

            title: "🏁 NASCAR LIVE",

            modalClass: "nascar-live-full",

            content: await createLiveContent(live),

            onClose: () => {

                clearInterval(refreshTimer);

                refreshTimer = null;

            }

        });

        clearInterval(refreshTimer);

        refreshTimer = setInterval(
            refreshLiveFullModal,
            5000
        );

        initSummaryCarousel();

    } catch (error) {

        console.error(
            "❌ Error opening NASCAR LIVE:",
            error
        );

    }

};


/* =========================================================
   CONTENT
   ========================================================= */

async function createLiveContent(live) {

    return `

        <div class="nascar-live-summary-wrapper">

            <button
                class="nascar-summary-arrow nascar-summary-arrow-left"
                type="button"
                aria-label="Información anterior">
                ‹
            </button>


            <div class="nascar-live-summary">

                <div class="nascar-live-item">
                    <span>🏁 Series</span>
                    <strong>${live.summary.series}</strong>
                </div>


                <div class="nascar-live-item">
                    <span>${live.summary.session.icon}</span>
                    <strong>${live.summary.session.name}</strong>
                </div>


                <div class="nascar-live-item">
                    <span>🏟 Circuito</span>
                    <strong>${live.summary.track}</strong>
                </div>


                <div class="nascar-live-item">
                    <span>📏 Longitud</span>
                    <strong>${live.summary.trackLength} mi</strong>
                </div>


                <div class="nascar-live-item">
                    <span>${live.summary.flag.icon}</span>
                    <strong>${live.summary.flag.name}</strong>
                </div>


                <div class="nascar-live-item">
                    <span>🏁 Vuelta</span>
                    <strong>${live.summary.lap}</strong>
                </div>


                <div class="nascar-live-item">
                    <span>⏳ Restan</span>
                    <strong>${live.summary.lapsToGo}</strong>
                </div>


                <div class="nascar-live-item">
                    <span>🏆 Stage</span>
                    <strong>
                        ${live.summary.stage?.number ?? "-"}
                    </strong>
                </div>


                <div class="nascar-live-item">
                    <span>🏁 Final Stage</span>
                    <strong>
                        ${
                            live.summary.stage?.finishLap
                                ? `V${live.summary.stage.finishLap}`
                                : "-"
                        }
                    </strong>
                </div>


                <div class="nascar-live-item">
                    <span>⏳ Restan Stage</span>
                    <strong>
                        ${live.summary.stage?.lapsRemaining ?? "-"}
                    </strong>
                </div>


                <div class="nascar-live-item">
                    <span>👑 Líderes</span>
                    <strong>
                        ${live.summary.leaders}
                    </strong>
                </div>


                <div class="nascar-live-item">
                    <span>🔄 Lead Changes</span>
                    <strong>
                        ${live.summary.leadChanges}
                    </strong>
                </div>


                <div class="nascar-live-item">
                    <span>⚠️ Cautions</span>
                    <strong>
                        ${live.summary.cautions}
                    </strong>
                </div>


                <div class="nascar-live-item">
                    <span>🟨 Caution Laps</span>
                    <strong>
                        ${live.summary.cautionLaps}
                    </strong>
                </div>

            </div>


            <button
                class="nascar-summary-arrow nascar-summary-arrow-right"
                type="button"
                aria-label="Siguiente información">
                ›
            </button>

        </div>


        <div class="nascar-live-table">

            <div class="nascar-driver-header">

                <span>POS</span>
                <span>#</span>
                <span>DRIVER</span>
                <span>GAP</span>
                <span>LAST</span>
                <span class="nascar-pur">BEST</span>
                <span>AVG</span>
                <span>LED</span>
                <span class="nascar-pur">FAST</span>
                <span>GAIN</span>
                <span>START</span>
                <span>PITS</span>
                <span>STATUS</span>

            </div>


            <div class="nascar-driver-list">

                ${createDriverRows(live.leaderboard)}

            </div>

        </div>

    `;

}


/* =========================================================
   DRIVER ROWS
   ========================================================= */

function createDriverRows(leaderboard = []) {

    return leaderboard.map(driver => {

        const statusClass =
            driver.onTrack
                ? "nascar-status-live"
                : "nascar-status-off";


        const positionGain =
            Number(driver.positionGain ?? 0);


        const averageSpeed =
            Number(driver.averageSpeed);


        return `

            <div class="nascar-driver-row">

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
                        ${driver.sponsor ?? ""}
                    </small>

                    <small>
                        ${driver.manufacturer ?? ""}
                    </small>

                </span>


                <span class="nascar-gap">
                    ${driver.gap ?? "-"}
                </span>


                <span>
                    ${driver.lastLap ?? "-"}
                </span>


                <span class="nascar-best nascar-pur">
                    ${driver.bestLap ?? "-"}
                </span>


                <span>
                    ${
                        Number.isFinite(averageSpeed)
                            ? averageSpeed.toFixed(3)
                            : "-"
                    }
                </span>


                <span>
                    ${driver.lapsLed ?? 0}
                </span>


                <span class="nascar-fast nascar-pur">
                    ${driver.fastestLaps ?? 0}
                </span>


                <span class="nascar-gain">
                    ${
                        positionGain > 0
                            ? `+${positionGain}`
                            : positionGain
                    }
                </span>


                <span>
                    ${driver.startingPosition ?? "-"}
                </span>


                <span>
                    ${driver.pitStops ?? 0}
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

    try {

        const live = await NASCAR.getLiveRaceData();

        const driverList =
            document.querySelector(
                ".nascar-live-full .nascar-driver-list"
            );


        const table =
            document.querySelector(
                ".nascar-live-full .nascar-live-table"
            );


        if (!driverList || !table) {

            clearInterval(refreshTimer);

            refreshTimer = null;

            return;

        }


        const horizontalScroll =
            table.scrollLeft;


        const verticalScroll =
            table.scrollTop;


        driverList.innerHTML =
            createDriverRows(
                live.leaderboard
            );


        table.scrollLeft =
            horizontalScroll;


        table.scrollTop =
            verticalScroll;


    } catch (error) {

        console.error(
            "❌ NASCAR LIVE refresh error:",
            error
        );

    }

}


/* =========================================================
   SUMMARY CAROUSEL
   ========================================================= */

let summaryCarousel = null;

let summaryAutoTimer = null;

let summaryPaused = false;


/* =========================================================
   INIT CAROUSEL
   ========================================================= */

function initSummaryCarousel() {

    summaryCarousel =
        document.querySelector(
            ".nascar-live-full .nascar-live-summary"
        );


    if (!summaryCarousel) return;


    const leftButton =
        document.querySelector(
            ".nascar-live-full .nascar-summary-arrow-left"
        );


    const rightButton =
        document.querySelector(
            ".nascar-live-full .nascar-summary-arrow-right"
        );


    if (leftButton) {

        leftButton.onclick = () => {

            pauseSummaryCarousel();

            scrollSummary(-1);

        };

    }


    if (rightButton) {

        rightButton.onclick = () => {

            pauseSummaryCarousel();

            scrollSummary(1);

        };

    }


    summaryCarousel.onclick = () => {

        toggleSummaryCarousel();

    };


    startSummaryCarousel();

}


/* =========================================================
   SCROLL
   ========================================================= */

function scrollSummary(direction) {

    if (!summaryCarousel) return;


    const card =
        summaryCarousel.querySelector(
            ".nascar-live-item"
        );


    if (!card) return;


    const gap = 10;


    const distance =
        card.offsetWidth + gap;


    summaryCarousel.scrollBy({

        left:
            distance * direction,

        behavior:
            "smooth"

    });

}


/* =========================================================
   AUTO
   ========================================================= */

function startSummaryCarousel() {

    clearInterval(summaryAutoTimer);


    summaryPaused = false;


    summaryAutoTimer =
        setInterval(() => {

            if (!summaryCarousel) return;

            if (summaryPaused) return;


            const maxScroll =
                summaryCarousel.scrollWidth -
                summaryCarousel.clientWidth;


            if (summaryCarousel.scrollLeft >= maxScroll - 5) {

                summaryCarousel.scrollTo({

                    left: 0,

                    behavior: "smooth"

                });

            } else {

                scrollSummary(1);

            }

        }, 3500);

}


/* =========================================================
   PAUSE
   ========================================================= */

function pauseSummaryCarousel() {

    summaryPaused = true;

    clearInterval(summaryAutoTimer);

}


/* =========================================================
   TOGGLE PAUSE
   ========================================================= */

function toggleSummaryCarousel() {

    if (summaryPaused) {

        startSummaryCarousel();

    } else {

        pauseSummaryCarousel();

    }

}


/* =========================================================
   CLEANUP
   ========================================================= */

function stopSummaryCarousel() {

    clearInterval(summaryAutoTimer);

    summaryAutoTimer = null;

    summaryCarousel = null;

    summaryPaused = false;

}
