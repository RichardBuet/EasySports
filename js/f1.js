import { renderF1 } from "../modules/pages/f1.js";

const app = document.getElementById("app");

export async function refreshF1() {

    app.innerHTML = await renderF1();

}

document.addEventListener("DOMContentLoaded", async () => {

    await refreshF1();

});
