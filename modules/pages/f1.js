import { createLayout } from "../core/layout.js";
import { setSportTheme } from "../utils/theme.js";

export async function renderF1() {

    setSportTheme("f1");

    return createLayout("<h1>F1 one re OK</h1>");
}
