import { renderF1 } from "../modules/pages/f1.js";
import { initSportsMenu } from "../modules/core/menu.js";

const app = document.getElementById("app");

export async function refreshF1() {

    app.innerHTML = await renderF1();
initSportsMenu() ;

}

document.addEventListener("DOMContentLoaded", async () => {

    await refreshF1();

});
