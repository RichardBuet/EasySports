import { renderNascar } from "../modules/pages/nascar.js";
import { initNascarSelector } from "../modules/nascar/events.js";

document.addEventListener("DOMContentLoaded",async()=>{

    const app=document.getElementById("app");

    app.innerHTML=await renderNascar();

});
