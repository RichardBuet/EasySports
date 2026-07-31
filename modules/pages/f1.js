import { createLayout } from "../core/layout.js";
import { setSportTheme } from "../utils/theme.js";

import { createHero } from "../f1/hero.js";
import { createDashboard } from "../f1/dashboard.js";
import { createSelector } from "../f1/selector.js";
import { createRaceCenter } from "../f1/raceCenter.js";
import { createCalendarCard } from "../f1/calendarCard.js";
import { createDriversCard } from "../f1/driversCard.js";
//  ${await createExtras()}
export async function renderF1() {

    setSportTheme("f1");

return createLayout(`
    ${await createHero()}
    ${createSelector()}
    ${await createDashboard()}
`);

}
    

