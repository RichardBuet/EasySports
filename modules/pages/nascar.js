import { createLayout } from "../core/layout.js";
import { createNascarHero } from "../nascar/hero.js";
import { createNascarSelector } from "../nascar/selector.js";
import { createNascarDashboard } from "../nascar/dashboard.js";

export async function renderNascar(){

    return createLayout(`
        ${await createNascarHero()}
        ${createNascarSelector()}
        ${await createNascarDashboard()}
    `);

}
