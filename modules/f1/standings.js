import { F1 } from "../../services/siteF1.js";

export async function createStandings() {

    const standings = await F1.getStandings();

    return `
        <section class="card">
            <h2>Driver Standings</h2>

            <ul>
                ${standings.map(driver => `
                    <li>
                        ${driver.position}. ${driver.name} - ${driver.points} pts
                    </li>
                `).join("")}
            </ul>
        </section>
    `;

}
