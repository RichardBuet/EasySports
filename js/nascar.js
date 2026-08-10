import { renderNascar } from "../modules/pages/nascar.js";
import { initSportsMenu } from "../modules/core/menu.js";
import { initNascarEvents } from "../modules/nascar/events.js";
import "../modules/nascar/liveModal.js";
import "../modules/nascar/calendar.js";
import "../modules/nascar/resultModal.js";
import "../modules/nascar/drivers.js";
import "../modules/nascar/liveRaceModal.js";
const app=document.getElementById("app");

export async function refreshNascar(){
    app.innerHTML=await renderNascar();
    initSportsMenu();
    initNascarEvents();
}

document.addEventListener("DOMContentLoaded",async()=>{
    await refreshNascar();
});
