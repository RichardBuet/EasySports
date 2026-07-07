import { renderHome } from "../modules/pages/home.js";

export function initRouter() {

    console.log("=================================");
    console.log(" EasySports iniciado");
    console.log("=================================");

    const app = document.getElementById("app");

    app.innerHTML = renderHome();

}
