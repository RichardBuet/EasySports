// =====================================
// EasySports API Service
// =====================================

export async function getJSON(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${url}`);
        }

        return await response.json();

    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}


export async function getF1Standings() {

    try {

        const response = await fetch(
    "https://api.jolpi.ca/ergast/f1/current/driverStandings.json?t=" + Date.now()
);

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

        return null;

    }

}

