import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

let refreshTimer = null;
let summaryCarousel = null;
let summaryAutoTimer = null;
let summaryPaused = false;
let driverBadgeCache = new Map();

/* =========================================================
   OPEN NASCAR LIVE FULL
   ========================================================= */

window.openLiveFullModal = async () => {
    try {
        const live =
            await NASCAR.getLiveRaceData();
        openModal({
            title: ` 🏁 NASCAR
            <button class="nascar-live-full-header-vivo" type="button"> En Vivo </button>`,
            modalClass: "nascar-live-full",
            content:
                await createLiveContent(live),
            onClose: () => { stopLiveFull(); }
        });
        clearInterval(refreshTimer);
        refreshTimer = setInterval(refreshLiveFullModal, 5000);
        initSummaryCarousel();
        initLiveFullClose();
    } catch (error) { console.error( "❌ Error opening NASCAR LIVE:", error);}
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
   NUMEROS DE DRIVER
   ========================================================= */
async function getDriverBadge(driverId) {

    if (!driverId) return null;

    if (driverBadgeCache.has(driverId)) {
        return driverBadgeCache.get(driverId);
    }

    try {

        const driver =
            await NASCAR.getDriver(driverId);

        const badge =
            driver?.badge ??
            driver?.profile?.badge ??
            null;

        driverBadgeCache.set(driverId, badge);

        return badge;

    } catch (error) {

        console.warn(
            "No se pudo obtener badge del piloto:",
            driverId
        );

        driverBadgeCache.set(driverId, null);

        return null;

    }

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

                    <strong data-live="series">
                        ${live.summary.series}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>
                        ${live.summary.session.icon}
                    </span>

                    <strong data-live="session">
                        ${live.summary.session.name}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>🏟 Circuito</span>

                    <strong data-live="track">
                        ${live.summary.track}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>📏 Longitud</span>

                    <strong data-live="trackLength">
                        ${live.summary.trackLength} mi
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>
                        ${live.summary.flag.icon}
                    </span>

                    <strong data-live="flag">
                        ${live.summary.flag.name}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>🏁 Vuelta</span>

                    <strong data-live="lap">
                        ${
                            Number.isFinite(parseInt(live.summary.lap, 10))
                                ? parseInt(live.summary.lap, 10)
                                : "-"
                        }
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>⏳ Restan</span>

                    <strong data-live="lapsToGo">
                        ${live.summary.lapsToGo}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>🏆 Stage</span>

                    <strong data-live="stage">
                        ${live.summary.stage?.number ?? "-"}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>🏁 Final Stage</span>

                    <strong data-live="finishLap">
                        ${
                            live.summary.stage?.finishLap
                                ? `V${live.summary.stage.finishLap}`
                                : "-"
                        }
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>⏳ Restan Stage</span>

                    <strong data-live="stageLapsRemaining">
                        ${live.summary.stage?.lapsRemaining ?? "-"}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>👑 Líderes</span>

                    <strong data-live="leaders">
                        ${live.summary.leaders}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>🔄 Lead Changes</span>

                    <strong data-live="leadChanges">
                        ${live.summary.leadChanges}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>⚠️ Cautions</span>

                    <strong data-live="cautions">
                        ${live.summary.cautions}
                    </strong>

                </div>
                <div class="nascar-live-full-item">

                    <span>🟨 Caution Laps</span>

                    <strong data-live="cautionLaps">
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

                ${await createDriverRows(live.leaderboard)}

            </div>


        </div>

    `;

}


/* =========================================================
   DRIVER ROWS
   ========================================================= */

async function createDriverRows(leaderboard = []) {

   const drivers = await Promise.all(
   
       leaderboard.map(async driver => ({
   
           ...driver,
   
           badge:
               await getDriverBadge(
                   driver.driverId
               )
   
       }))
   
   );
   
    return drivers.map(driver => {


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


               <span class="nascar-live-number">
               
                   ${
                       driver.badge
                           ? `<img
                               src="${driver.badge}"
                               alt="#${driver.number}"
                               loading="lazy"
                           >`
                           : `#${driver.number}`
                   }
               
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


        const summary =
            modal.querySelector(
                ".nascar-live-full-summary"
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
            await createDriverRows(
                live.leaderboard
            );


        /*
           Actualizamos las tarjetas
           superiores sin reconstruir
           el carrusel.
        */

        if (summary) {

            summary
                .querySelector('[data-live="series"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.series ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="session"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.session?.name ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="track"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.track ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="trackLength"]')
                ?.replaceChildren(
                    document.createTextNode(
                        `${live.summary.trackLength ?? "-"} mi`
                    )
                );


            summary
                .querySelector('[data-live="flag"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.flag?.name ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="lap"]')
                ?.replaceChildren(
                    document.createTextNode(
                      Number.isFinite(parseInt(live.summary.lap, 10))
                          ? parseInt(live.summary.lap, 10)
                          : "-"
                  )
                );


            summary
                .querySelector('[data-live="lapsToGo"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.lapsToGo ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="stage"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.stage?.number ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="finishLap"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.stage?.finishLap
                            ? `V${live.summary.stage.finishLap}`
                            : "-"
                    )
                );


            summary
                .querySelector('[data-live="stageLapsRemaining"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.stage?.lapsRemaining ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="leaders"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.leaders ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="leadChanges"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.leadChanges ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="cautions"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.cautions ?? "-"
                    )
                );


            summary
                .querySelector('[data-live="cautionLaps"]')
                ?.replaceChildren(
                    document.createTextNode(
                        live.summary.cautionLaps ?? "-"
                    )
                );

        }


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


    /*    Click sobre las tarjetas:  pausa / reanuda.   */

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
