import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export async function getDrivers(season = "current") {

    const url = `${BASE_URL}/${season}/drivers/?format=json`;

    return await fetchJSON(url);

}
