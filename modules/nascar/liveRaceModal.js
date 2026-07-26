import { NASCAR } from "../../services/site.js";

export async function openLiveRaceModal() {

    try {

        const live = await NASCAR.getLiveRaceData();

        console.log(live);

    } catch (error) {

        console.error(error);

    }

}

window.openLiveRace = openLiveRaceModal;
