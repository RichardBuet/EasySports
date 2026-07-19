// services/nascar/standings.js

const SERIES = 1; // 1 = Cup Series
const SEASON = 2026;

const URL = `https://cf.nascar.com/cacher/${SEASON}/${SERIES}/points-feed.json`;

export async function getStandings() {
    const response = await fetch(URL);

    if (!response.ok) {
        throw new Error(`Error al obtener la clasificación NASCAR (${response.status})`);
    }

    return await response.json();
}
