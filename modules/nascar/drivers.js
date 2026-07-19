import { NASCAR } from "../../services/site.js";

export async function createDrivers() {

    const drivers = await NASCAR.getStandingsWithDrivers();

    console.log(drivers);

    return "";

}
