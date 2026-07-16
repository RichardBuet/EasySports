import { state } from "../../config/state.js";
import { refreshNascar } from "../../js/nascar.js";

export function initNascarSelector(){
    const selector=document.getElementById("nascar-selector");
    if(!selector)return;
    selector.addEventListener("click",async(event)=>{
        const button=event.target.closest("button");
        if(!button)return;
        state.nascarSeries=Number(button.dataset.series);
        await refreshNascar();
    });
}
