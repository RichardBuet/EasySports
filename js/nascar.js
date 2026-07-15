import { renderNascar } from "../modules/pages/nascar.js";

document.addEventListener("DOMContentLoaded",async()=>{

    const app=document.getElementById("app");

    app.innerHTML=await renderNascar();

});
