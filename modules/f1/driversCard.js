import { createDrivers } from "./drivers.js";

export async function createDriversCard() {

    return `
        <section class="driversCard">

            ${await createDrivers()}

        </section>
    `;

}
