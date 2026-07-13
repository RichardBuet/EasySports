import { NASCARLive } from "./live.js";
import { adaptNascarLive } from "../../adapters/nascarLiveAdapter.js";

export class NASCAR {

    static async getLiveRace() {

        const data = await NASCARLive.getLiveRace();

        return adaptNascarLive(data);

    }

}
