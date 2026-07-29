import { F1 } from "../../services/siteF1.js";

export async function createQualifying() {

    const qualifying = await F1.getQualifying();

    return `
        <section class="card">

            <h2>⏱️ Qualifying</h2>

            <ul>
                ${qualifying.map(driver => `
                    <li>
                        ${driver.position}. ${driver.driver.fullName}
                    </li>
                `).join("")}
            </ul>

        </section>
    `;

}
