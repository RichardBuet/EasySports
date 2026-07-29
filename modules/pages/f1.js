import { createLayout } from "../core/layout.js";
import { setSportTheme } from "../utils/theme.js";
import { createStandings } from "../f1/standings.js";

export async function renderF1() {

    setSportTheme("f1");

    return createLayout("<h1>F1 vamos 🔥 one re OK</h1>");
}
