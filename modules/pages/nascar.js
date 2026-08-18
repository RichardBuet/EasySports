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


    const [
        hero,
        raceCenter,
        calendar,
        schedule,
        drivers
    ] = await Promise.all([

        createNascarHero(),

        createRaceCenter(),

        createCalendarCard(),

        createSchedule(),

        createDrivers()

    ]);


    return createLayout(`

        ${hero}

        ${createNascarSelector()}

        <section class="dashboard">

            <div class="dashboard-grid">

                ${raceCenter}

                ${calendar}

                ${schedule}

                ${drivers}

            </div>

        </section>

    `);

}
