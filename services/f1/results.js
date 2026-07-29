import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export async function getRaceResults(
    season = "current",
    round = "last"
) {

    const url = `${BASE_URL}/${season}/${round}/results/?format=json`;

    return await fetchJSON(url);

}
