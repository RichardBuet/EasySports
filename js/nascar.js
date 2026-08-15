import { renderNascar } from "../modules/pages/nascar.js";
import { initSportsMenu } from "../modules/core/menu.js";
import { initNascarEvents } from "../modules/nascar/events.js";
import { centerCalendarCurrentRace } from "../modules/nascar/calendarCard.js";
import { NASCAR } from "../services/site.js";

import "../modules/nascar/liveFullModal.js";
import "../modules/nascar/calendar.js";
import "../modules/nascar/resultModal.js";
import "../modules/nascar/drivers.js";
import "../modules/nascar/liveRaceModal.js";
import "../modules/nascar/raceInfoModal.js";

const app = document.getElementById("app");

export async function refreshNascar() {

    app.innerHTML = await renderNascar();

    initSportsMenu();
    initNascarEvents();

    requestAnimationFrame(() => {

        requestAnimationFrame(async () => {

            const timeline = await NASCAR.getTimeline();

            centerCalendarCurrentRace(
                timeline.currentIndex
            );

        });

    });

}

document.addEventListener("DOMContentLoaded", async () => {

    await refreshNascar();

});
