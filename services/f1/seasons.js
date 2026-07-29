import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export async function getSeasons() {

    const url = `${BASE_URL}/seasons/?format=json`;

    return await fetchJSON(url);

}
