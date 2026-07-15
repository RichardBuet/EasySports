import { createLive } from "./live.js";

export function createDashboard() {

    return `

        <section class="dashboard">

            ${createLive()}

        </section>

    `;

}
