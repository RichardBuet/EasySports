import { F1 } from "../../services/siteF1.js";

export async function createConstructorStandings() {

    const standings = await F1.getConstructorStandings();

    return `
        <section class="card">
            <h2>🏆 Constructor Standings</h2>

            <ul>
                ${standings.map(team => `
                    <li>
                        ${team.position}. ${team.constructor.name} - ${team.points} pts
                    </li>
                `).join("")}
            </ul>

        </section>
    `;

}
