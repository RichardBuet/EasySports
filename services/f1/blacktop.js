import { fetchJSON } from "../shared/fetch.js";

const BASE_URL =
    "/EasySports/data/f1-blacktop.json";


export async function getBlacktopEvents() {

    const data =
        await fetchJSON(BASE_URL);

    return data?.data ?? [];

}
