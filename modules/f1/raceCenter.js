import { createResults } from "./results.js";
import { createQualifying } from "./qualifying.js";
export async function createRaceCenter() {
    try {
        console.log("🏁 Race Center: iniciando");
        const results = await createResults();
        console.log("🏁 Race Center: resultados OK");
        const qualifying = await createQualifying();
        console.log("🏁 Race Center: qualifying OK");
        return `
            <section class="raceCenter">
                ${results}
                ${qualifying}
            </section>
        `;
    } catch (error) {
        console.error(
            "❌ Race Center error:",
            error
        );
        return `
            <section class="raceCenter">
                <div class="card">
                    <h2>🏁 Race Center</h2>
                    <p>
                        No se pudo cargar la información.
                    </p>
                    <small>
                        ${error?.message ?? error}
                    </small>
                </div>
            </section>
        `;
    }
}
