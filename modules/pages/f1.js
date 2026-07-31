import { createLayout } from "../core/layout.js";
import { setSportTheme } from "../utils/theme.js";

import { createHero } from "../f1/hero.js";
import { createSelector } from "../f1/selector.js";

import { createRaceCenter } from "../f1/raceCenter.js";
import { createStandings } from "../f1/standings.js";
import { createConstructorStandings } from "../f1/constructorStandings.js";
import { createResults } from "../f1/results.js";
import { createQualifying } from "../f1/qualifying.js";
import { createDrivers } from "../f1/drivers.js";
import { createCalendar } from "../f1/calendar.js";

export async function renderF1() {

    setSportTheme("f1");

    return createLayout(`

        ${await createHero()}

        ${createSelector()}

        <section class="dashboard">

            <div class="dashboard-grid">

                ${await createRaceCenter()}

                ${await createStandings()}

                ${await createConstructorStandings()}

                ${await createResults()}

                ${await createQualifying()}

                ${await createDrivers()}

                ${await createCalendar()}

            </div>

        </section>

    `);

}
