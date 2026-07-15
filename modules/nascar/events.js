import { state } from "../../config/state.js";

export function initNascarSelector(){

    const selector=document.getElementById("nascar-selector");

    if(!selector)return;

    selector.addEventListener("click",(event)=>{

        const button=event.target.closest("button");

        if(!button)return;

        state.nascarSeries=Number(button.dataset.series);

        location.reload();

    });

}
