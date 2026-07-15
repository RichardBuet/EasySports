import { createLive } from "./live.js";

export function createDashboard(){
    return `
        <section class="dashboard">
            <div class="dashboard-grid">
                ${createLive()}
                
                <div class="dashboard-widget">
                    <h2>📅 Próximos eventos</h2>
                    <p>Próximamente...</p>
                </div>
            </div>
        </section>
    `;
}
