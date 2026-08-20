import { F1 } from "../../services/siteF1.js";

export async function createResults() {
    const results = await F1.getResults();
    return `
        <section class="card f1-results">
            <h2>🏁 Last Race</h2>
            <ul>
                ${results.map(result => `
                    <li>
                        <span>${result.position}.</span>
                        <strong>${result.driver.fullName}</strong>
                        <span>${result.constructor.name}</span>
                        <span>${result.points} pts</span>
                    </li>
                `).join("")}
            </ul>
        </section>
    `;
}
