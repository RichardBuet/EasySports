import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/f1/alpha";

export async function getSessionResults(
    roundId,
    sessionFilter
) {

    if (!roundId || !sessionFilter) {
        return null;
    }

    const url =
        `${BASE_URL}/results/${roundId}/${sessionFilter}/`;

    return await fetchJSON(url);

}
