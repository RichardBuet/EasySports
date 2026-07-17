import { createLive } from "./live.js";
import { createNextEvent } from "./nextEvent.js";
import { createLastResult } from "./lastResult.js";

export async function createDashboard(){

    return `
        <section class="dashboard">
            <div class="dashboard-grid">
                ${createLive()}
                ${await createNextEvent()}
                ${createLastResult()}
            </div>
        </section>
    `;

}
