import { createLayout } from "../core/layout.js";
import { createNascarHero } from "../nascar/hero.js";
import { createNascarSelector } from "../nascar/selector.js";
import { createRaceCenter } from "../nascar/raceCenter.js";
import { createNascarDashboard } from "../nascar/dashboard.js";
import { createSchedule } from "../nascar/schedule.js";
import { createDrivers } from "../nascar/drivers.js";
import { createCalendarCard } from "../nascar/calendarCard.js";
import { setSportTheme } from "../utils/theme.js";
//${await createNascarDashboard()}
export async function renderNascar() {

    setSportTheme("nascar");

    return createLayout(`
        ${await createNascarHero()}
        ${createNascarSelector()}
        ${await createRaceCenter()}
        ${await createCalendarCard()}
        
        ${await createSchedule()}
        ${await createDrivers()}
    `);

}
