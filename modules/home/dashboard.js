import { createLive } from "./live.js";

export function createDashboard() {

    return `

        <section class="dashboard">

            <div class="dashboard-header">

                <h2>📊 Dashboard</h2>

                <p>Resumen deportivo en tiempo real</p>

            </div>

            <div class="dashboard-content">

                ${createLive()}

            </div>

        </section>

    `;

}
