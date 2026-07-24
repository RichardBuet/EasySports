import { state } from "../../config/state.js";
import { refreshNascar } from "../../js/nascar.js";

import { NASCAR } from "../../services/site.js";
import { showDriverModal } from "./driverModal.js";

export function initNascarEvents(){

    const selector=document.getElementById("nascar-selector");

    if(selector){

        selector.addEventListener("click",async(event)=>{

            const button=event.target.closest("button");

            if(!button)return;

            state.nascarSeries=Number(button.dataset.series);

            await refreshNascar();

        });

    }

    document.addEventListener("click",async(event)=>{

        const link=event.target.closest(".driver-link");

        if(!link)return;

        const driver=await NASCAR.getDriver(link.dataset.driverId);

        if(driver){

            showDriverModal(driver);

        }

    });

}
