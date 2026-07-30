import { createResults } from "./results.js";
import { createQualifying } from "./qualifying.js";

export async function createRaceCenter() {

    return `
        <section class="raceCenter">

            ${await createResults()}

            ${await createQualifying()}

        </section>
    `;

}
