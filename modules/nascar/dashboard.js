import { NASCAR } from "../../services/site.js";

export async function createNascarDashboard() {

    const nextRace = await NASCAR.getNextRace();
    const lastRace = await NASCAR.getLastRace();

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    return `
        <section class="dashboard">

            <div class="dashboard-grid">

                <div class="dashboard-widget">

                    <h3>NEXT RACE</h3>

                    <div class="race-name">
                        ${nextRace.name}
                    </div>

                    <p>🏁 ${nextRace.track}</p>
                    <p>📅 ${formatDate(nextRace.date)}</p>
                    <p>🏎️ ${nextRace.scheduledLaps} Laps</p>

                </div>

                ${
                    lastRace ? `
                    <div class="dashboard-widget">

                        <h3>LAST RACE</h3>

                        <div class="race-name">
                            ${lastRace.name}
                        </div>

                        <p>🏁 ${lastRace.track}</p>
                        <p>📅 ${formatDate(lastRace.date)}</p>
                        <p>✅ ${lastRace.actualLaps}/${lastRace.scheduledLaps} Laps</p>

                    </div>
                    ` : ""
                }

            </div>

        </section>
    `;

}
