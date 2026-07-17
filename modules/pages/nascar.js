import { createLayout } from "../core/layout.js";
import { createNascarHero } from "../nascar/hero.js";

export async function renderNascar(){

    return createLayout(`
        ${await createNascarHero()}
    `);

}
