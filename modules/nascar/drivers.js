import { NASCAR } from "../../services/site.js";

export async function createDrivers() {

    const drivers = await NASCAR.getStandingsWithDrivers();

    return `
        <section class="drivers">
            <h2>Drivers</h2>
            <p>Total: ${drivers.length}</p>
            <p>Líder: ${drivers[0].driver}</p>
            <p>Puntos: ${drivers[0].points}</p>
        </section>
    `;

}
