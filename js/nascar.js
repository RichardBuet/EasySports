import { renderNascar } from "../modules/pages/nascar.js";
import { initSportsMenu } from "../modules/core/menu.js";
import { initNascarSelector } from "../modules/nascar/events.js";
import "../modules/nascar/live.js";
import "../modules/nascar/calendar.js";
import "../modules/nascar/result.js";
import "../modules/nascar/drivers.js";

const app=document.getElementById("app");

export async function refreshNascar(){

    app.innerHTML=await renderNascar();

    initSportsMenu();

    initNascarSelector();

}

document.addEventListener("DOMContentLoaded",async()=>{

    await refreshNascar();

});
