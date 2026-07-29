import { F1 } from "../../services/siteF1.js";

export async function createCircuits() {

    const circuits = await F1.getCircuits();

    return `
        <section class="card">

            <h2>🏟️ Circuits</h2>

            <ul>
                ${circuits.map(circuit => `
                    <li>
                        ${circuit.name}
                    </li>
                `).join("")}
            </ul>

        </section>
    `;

}
