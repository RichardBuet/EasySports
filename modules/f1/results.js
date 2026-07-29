import { F1 } from "../../services/siteF1.js";

export async function createResults() {

    const results = await F1.getResults();

    return `
        <section class="card">

            <h2>🏁 Last Race</h2>

            <ul>
                ${results.map(driver => `
                    <li>
                        ${driver.position}. ${driver.driver.fullName}
                    </li>
                `).join("")}
            </ul>

        </section>
    `;

}
