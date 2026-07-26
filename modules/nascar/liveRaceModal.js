import { NASCAR } from "../../services/site.js";

export async function openLiveRaceModal() {

    try {

        const live = await NASCAR.getLiveRaceData();

        console.log("LIVE RACE");
        console.log(live);

    } catch (error) {

        console.error("Error cargando Live Race:", error);

    }

}
