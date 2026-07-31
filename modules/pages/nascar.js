import { createLayout } from "../core/layout.js";
import { setSportTheme } from "../utils/theme.js";

import { createNascarHero } from "../nascar/hero.js";
import { createNascarSelector } from "../nascar/selector.js";

import { createRaceCenter } from "../nascar/raceCenter.js";
import { createCalendarCard } from "../nascar/calendarCard.js";
import { createSchedule } from "../nascar/schedule.js";
import { createDrivers } from "../nascar/drivers.js";

export async function renderNascar() {

    setSportTheme("nascar");

    return createLayout(`

        ${await createNascarHero()}

        ${createNascarSelector()}

        <section class="dashboard">

            <div class="dashboard-grid">

                ${await createRaceCenter()}

                ${await createCalendarCard()}

                ${await createSchedule()}

                ${await createDrivers()}

            </div>

        </section>

    `);

}
