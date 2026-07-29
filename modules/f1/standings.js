import { F1 } from "../../services/siteF1.js";

export async function renderStandings() {

    try {

        const standings = await F1.getStandings();

        console.log("F1 Standings:", standings);

    } catch (error) {

        console.error("Error cargando clasificación F1:", error);

    }

}
