import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";


let refreshTimer = null;

let summaryCarousel = null;

let summaryAutoTimer = null;

let summaryPaused = false;


/* =========================================================
   OPEN NASCAR LIVE FULL
   ========================================================= */

window.openLiveFullModal = async () => {

    try {

        const live =
            await NASCAR.getLiveRaceData();


        openModal({

            title: "🏁 NASCAR LIVE",

            modalClass: "nascar-live-full",

            content:
                await createLiveContent(live),

            onClose: () => {

                stopLiveFull();

            }

        });


        clearInterval(refreshTimer);

        refreshTimer =
            setInterval(
                refreshLiveFullModal,
                5000
            );


        /*
           El DOM ya existe porque openModal()
           acaba de insertar el contenido.
        */

        initSummaryCarousel();

        initLiveFullClose();


    } catch (error) {

        console.error(
            "❌ Error opening NASCAR LIVE:",
            error
        );

    }

};



/* =========================================================
   CLOSE LIVE FULL
   ========================================================= */

function initLiveFullClose() {

    const closeButton =
        document.querySelector(
            ".nascar-live-full .nascar-live-full-close"
        );

    if (!closeButton) return;

    closeButton.addEventListener(
        "click",
        () => {

            const overlay =
                document.querySelector(
                    ".nascar-live-full-overlay"
                );

            if (overlay) {

                overlay.remove();

            }

            clearInterval(refreshTimer);

            refreshTimer = null;

            stopSummaryCarousel();

        },
        {
            once: true
        }
    );

}




/* =========================================================
   CONTENT
   ========================================================= */

async function createLiveContent(live) {

    return `

        <!-- =================================================
             SUMMARY
             ================================================= -->

        <div class="nascar-live-full-summary-wrapper">


            <button
                class="nascar-live-full-summary-arrow
                       nascar-live-full-summary-arrow-left"
                type="button"
                aria-label="Información anterior">
                ‹
            </button>


            <div class="nascar-live-full-summary">


                <div class="nascar-live-full-item">

                    <span>🏁 Series</span>

                    <strong>
                        ${live.summary.series}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>
                        ${live.summary.session.icon}
                    </span>

                    <strong>
                        ${live.summary.session.name}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>🏟 Circuito</span>

                    <strong>
                        ${live.summary.track}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>📏 Longitud</span>

                    <strong>
                        ${live.summary.trackLength} mi
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>
                        ${live.summary.flag.icon}
                    </span>

                    <strong>
                        ${live.summary.flag.name}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>🏁 Vuelta</span>

                    <strong>
                        ${live.summary.lap}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>⏳ Restan</span>

                    <strong>
                        ${live.summary.lapsToGo}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>🏆 Stage</span>

                    <strong>
                        ${live.summary.stage?.number ?? "-"}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>🏁 Final Stage</span>

                    <strong>
                        ${
                            live.summary.stage?.finishLap
                                ? `V${live.summary.stage.finishLap}`
                                : "-"
                        }
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>⏳ Restan Stage</span>

                    <strong>
                        ${live.summary.stage?.lapsRemaining ?? "-"}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>👑 Líderes</span>

                    <strong>
                        ${live.summary.leaders}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>🔄 Lead Changes</span>

                    <strong>
                        ${live.summary.leadChanges}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>⚠️ Cautions</span>

                    <strong>
                        ${live.summary.cautions}
                    </strong>

                </div>


                <div class="nascar-live-full-item">

                    <span>🟨 Caution Laps</span>

                    <strong>
                        ${live.summary.cautionLaps}
                    </strong>

                </div>


            </div>


            <button
                class="nascar-live-full-summary-arrow
                       nascar-live-full-summary-arrow-right"
                type="button"
                aria-label="Siguiente información">
                ›
            </button>


        </div>


        <!-- =================================================
             TABLE
             ================================================= -->

        <div class="nascar-live-full-table">


            <div class="nascar-live-full-driver-header">

                <span>POS</span>

                <span>#</span>

                <span>DRIVER</span>

                <span>GAP</span>

                <span>LAST</span>

                <span class="nascar-live-full-pur">
                    BEST
                </span>

                <span>AVG</span>

                <span>LED</span>

                <span class="nascar-live-full-pur">
                    FAST
                </span>

                <span>GAIN</span>

                <span>START</span>

                <span>PITS</span>

                <span>STATUS</span>

            </div>


            <div class="nascar-live-full-driver-list">

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
                ? "nascar-live-full-status-live"
                : "nascar-live-full-status-off";


        const positionGain =
            Number(
                driver.positionGain ?? 0
            );


        const averageSpeed =
            Number(
                driver.averageSpeed
            );


        return `

            <div class="nascar-live-full-driver-row">


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


                <span class="nascar-live-full-gap">
                    ${driver.gap ?? "-"}
                </span>


                <span>
                    ${driver.lastLap ?? "-"}
                </span>


                <span class="nascar-live-full-best
                             nascar-live-full-pur">

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


                <span class="nascar-live-full-fast
                             nascar-live-full-pur">

                    ${driver.fastestLaps ?? 0}

                </span>


                <span class="nascar-live-full-gain">

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

                    ${
                        driver.onTrack
                            ? "🟢"
                            : "🔴"
                    }

                    ${
                        driver.onDVP
                            ? "⚠️"
                            : ""
                    }

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

        const live =
            await NASCAR.getLiveRaceData();


        const modal =
            document.querySelector(
                ".nascar-live-full"
            );


        if (!modal) {

            stopLiveFull();

            return;

        }


        const driverList =
            modal.querySelector(
                ".nascar-live-full-driver-list"
            );


        const table =
            modal.querySelector(
                ".nascar-live-full-table"
            );


        if (!driverList || !table) {

            return;

        }


        /*
           Guardamos los scrolls
           antes de actualizar las filas.
        */

        const horizontalScroll =
            table.scrollLeft;


        const verticalScroll =
            table.scrollTop;


        driverList.innerHTML =
            createDriverRows(
                live.leaderboard
            );


        /*
           Restauramos la posición.
        */

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

function initSummaryCarousel() {

    summaryCarousel =
        document.querySelector(
            ".nascar-live-full-summary"
        );


    if (!summaryCarousel) {

        return;

    }


    const leftButton =
        document.querySelector(
            ".nascar-live-full-summary-arrow-left"
        );


    const rightButton =
        document.querySelector(
            ".nascar-live-full-summary-arrow-right"
        );


    if (leftButton) {

        leftButton.onclick = (event) => {

            event.stopPropagation();

            pauseSummaryCarousel();

            scrollSummary(-1);

        };

    }


    if (rightButton) {

        rightButton.onclick = (event) => {

            event.stopPropagation();

            pauseSummaryCarousel();

            scrollSummary(1);

        };

    }


    /*
       Click sobre las tarjetas:
       pausa / reanuda.
    */

    summaryCarousel.onclick = () => {

        toggleSummaryCarousel();

    };


    startSummaryCarousel();

}


/* =========================================================
   SCROLL SUMMARY
   ========================================================= */

function scrollSummary(direction) {

    if (!summaryCarousel) return;

    const card =
        summaryCarousel.querySelector(
            ".nascar-live-full-item"
        );

    if (!card) return;

    const gap =
        parseFloat(
            getComputedStyle(summaryCarousel).gap
        ) || 0;

    const distance =
        card.getBoundingClientRect().width + gap;

    summaryCarousel.scrollBy({

        left:
            distance * direction,

        behavior:
            "smooth"

    });

}


/* =========================================================
   AUTO CAROUSEL
   ========================================================= */

function startSummaryCarousel() {

    clearInterval(summaryAutoTimer);


    summaryPaused = false;


    summaryAutoTimer =
        setInterval(() => {


            if (!summaryCarousel) {

                return;

            }


            if (summaryPaused) {

                return;

            }


            const maxScroll =
                summaryCarousel.scrollWidth -
                summaryCarousel.clientWidth;


            if (maxScroll <= 0) {

                return;

            }


            if (
                summaryCarousel.scrollLeft
                >= maxScroll - 5
            ) {

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

    summaryAutoTimer = null;

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

    clearInterval(refreshTimer);

    clearInterval(summaryAutoTimer);


    refreshTimer = null;

    summaryAutoTimer = null;

    summaryCarousel = null;

    summaryPaused = false;

}
