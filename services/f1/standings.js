import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export async function getDriverStandings(season = "current") {

    const url = `${BASE_URL}/${season}/driverstandings/?format=json`;

    return await fetchJSON(url);

}
