import { createLive } from "./live.js";
import { createNextEvent } from "./nextEvent.js";

export function createDashboard(){
    return `
        <section class="dashboard">
            <div class="dashboard-grid">
                ${createLive()}
                ${createNextEvent()}
            </div>
        </section>
    `;
}
