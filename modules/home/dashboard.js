import { createToday } from "../home/today.js";
import { createLive } from "./live.js";
import { createNextEvent } from "./nextEvent.js";
import { createLastResult } from "./lastResult.js";

export async function createDashboard(){

    return `
        <section class="dashboard">
            <div class="dashboard-grid">
                ${createToday()}
                ${createLive()}
                ${await createNextEvent()}
                ${createLastResult()}
            </div>
        </section>
    `;

}
