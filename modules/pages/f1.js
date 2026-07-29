import { createLayout } from "../core/layout.js";
import { createStandings } from "../f1/standings.js";
import { setSportTheme } from "../utils/theme.js";

export async function renderF1() {

    setSportTheme("f1");

    return createLayout(`
        ${await createStandings()}
    `);

}
