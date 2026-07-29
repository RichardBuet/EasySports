import { createLayout } from "../core/layout.js";
import { setSportTheme } from "../utils/theme.js";
import { createStandings } from "../f1/standings.js";
import { createConstructorStandings } from "../f1/constructorStandings.js";
import { createSchedule } from "../f1/schedule.js";
import { createResults } from "../f1/results.js";
import { createQualifying } from "../f1/qualifying.js";
import { createDrivers } from "../f1/drivers.js";
import { createCircuits } from "../f1/circuits.js";

export async function renderF1() {
    setSportTheme("f1");

return createLayout(`
    ${await createStandings()}
    ${await createConstructorStandings()}
    ${await createSchedule()}
    ${await createResults()}
    ${await createQualifying()}
    ${await createDrivers()}
    ${await createCircuits()}
`);
    
}
