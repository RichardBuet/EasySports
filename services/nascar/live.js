const LIVE_URL = "https://cf.nascar.com/live/feeds/live-feed.json";

export class NASCARLive {

    static async getLiveRace() {

        const response = await fetch(LIVE_URL);

        if (!response.ok) {
            throw new Error("Error obteniendo Live Feed NASCAR");
        }

        return await response.json();

    }

}
