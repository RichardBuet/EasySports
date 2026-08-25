import { fetchJSON } from "../shared/fetch.js";

const BASE_URL="https://api.jolpi.ca/ergast/f1";

export async function getRaceResults(
    season="current",
    round=null
){
    const url=round
        ? `${BASE_URL}/${season}/${round}/results/?format=json`
        : `${BASE_URL}/${season}/results/?format=json`;

    return await fetchJSON(url);
}
