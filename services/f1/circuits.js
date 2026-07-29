import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export async function getCircuits(season = "current") {

    const url = `${BASE_URL}/${season}/circuits/?format=json`;

    return await fetchJSON(url);

}
