import { F1 } from "../../services/siteF1.js";

export async function createDrivers() {

    const drivers = await F1.getDrivers();

    return `
        <section class="card">

            <h2>👨‍🏎️ Drivers</h2>

            <ul>
                ${drivers.map(driver => `
                    <li>
                        ${driver.fullName}
                    </li>
                `).join("")}
            </ul>

        </section>
    `;

}
