import { fetchJSON } from "../shared/fetch.js";

const BASE_URL = "https://api.jolpi.ca/f1/alpha";

export async function getAlphaSchedule(season = "current") {

    const year =
        season === "current"
            ? new Date().getFullYear()
            : season;

    const url = `${BASE_URL}/schedules/${year}/`;

    return await fetchJSON(url);
}
