import { fetchJSON } from "../shared/fetch.js";
// qualy
const BASE_URL =
    "https://api.jolpi.ca/f1/alpha";


export async function getSessionResults(
    roundId,
    sessionFilter
) {

    if (!roundId || !sessionFilter) {
        return [];
    }


    const url =
        `${BASE_URL}/results/${roundId}/${sessionFilter}/`;


    const response =
        await fetchJSON(url);


    console.log(
        "🔥 ALPHA SESSION RESPONSE:",
        sessionFilter,
        response
    );


    /*
     * =====================================================
     * EXTRAER RESULTADOS
     * =====================================================
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


    if (Array.isArray(response?.data?.data)) {
        return response.data.data;
    }


    /*
     * Algunas respuestas Alpha pueden
     * contener el objeto Results dentro de data.
     */

    if (
        response?.data &&
        typeof response.data === "object"
    ) {

        const possibleKeys = [
            "items",
            "result",
            "Results",
            "entries"
        ];


        for (const key of possibleKeys) {

            if (
                Array.isArray(
                    response.data[key]
                )
            ) {

                return response.data[key];

            }

        }

    }


    console.warn(
        "⚠️ Alpha no encontró un array de resultados:",
        response
    );


    return [];
}
