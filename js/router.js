import { renderHome } from "../modules/pages/home.js";
import { initSportsMenu } from "../modules/core/menu.js";

export async function initRouter(){

    console.log("==============================");
    console.log(" EasySports iniciado");
    console.log("==============================");

    const app=document.getElementById("app");

    app.innerHTML=await renderHome();

    initSportsMenu();

}
