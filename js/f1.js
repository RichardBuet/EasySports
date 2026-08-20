import { renderF1 } from "../modules/pages/f1.js";
import { initSportsMenu } from "../modules/core/menu.js";
import { initF1DashboardModals } from "../modules/f1/dashboard.js";

const app = document.getElementById("app");

export async function refreshF1() {
    app.innerHTML = await renderF1();
    initSportsMenu();
    initF1DashboardModals();
}

document.addEventListener("DOMContentLoaded", async () => {
    await refreshF1();
});
