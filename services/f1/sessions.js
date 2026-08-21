import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/f1/alpha";

export async function getSessionResults(
    roundId,
    sessionFilter
) {

    if (!roundId || !sessionFilter) {
        return [];
    }

    const url =
        `${BASE_URL}/results/${roundId}/${sessionFilter}/`;

    const response = await fetchJSON(url);

    console.log(
        "ALPHA SESSION RESPONSE:",
        sessionFilter,
        response
    );

    /*
     * Alpha puede devolver los resultados
     * dentro de diferentes niveles.
     * Buscamos el array real.
     */

    if (Array.isArray(response)) {
        return response;
    }

    if (Array.isArray(response?.data)) {
        return response.data;
    }

    if (Array.isArray(response?.data?.results)) {
        return response.data.results;
    }

    if (Array.isArray(response?.results)) {
        return response.results;
    }

    return [];
}
