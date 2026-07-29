import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export async function getLaps(
    season = "current",
    round = "last"
) {

    const url = `${BASE_URL}/${season}/${round}/laps/?format=json`;

    return await fetchJSON(url);

}
