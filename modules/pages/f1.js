import { F1 } from "../../services/siteF1.js";

import { createLayout } from "../layout.js";
import { setSportTheme } from "../utils/theme.js";

import { createHero } from "./f1/hero.js";
import { createDashboard } from "./f1/dashboard.js";
import { createRaceCenter } from "./f1/raceCenter.js";

export async function renderF1() {

    setSportTheme("f1");

    const [
        hero,
        dashboard,
        raceCenter
    ] = await Promise.all([
        createHero(),
        createDashboard(),
        createRaceCenter()
    ]);

    return createLayout(`
        ${hero}

        ${dashboard}

        ${raceCenter}
    `);

}
