import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export async function getSchedule(season = "current") {

    const url = `${BASE_URL}/${season}/races/?format=json`;

    return await fetchJSON(url);

}
