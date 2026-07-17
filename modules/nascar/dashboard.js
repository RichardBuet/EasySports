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
        <section class="nascarDashboard">

            <div class="dashboardCard">

                <span class="dashboardTitle">NEXT RACE</span>

                <h2>${nextRace.name}</h2>

                <div class="dashboardInfo">
                    <span>🏁 ${nextRace.track}</span>
                    <span>📅 ${formatDate(nextRace.date)}</span>
                    <span>🏎️ ${nextRace.scheduledLaps} Laps</span>
                </div>

            </div>

            ${
                lastRace
                ? `
                <div class="dashboardCard">

                    <span class="dashboardTitle">LAST RACE</span>

                    <h2>${lastRace.name}</h2>

                    <div class="dashboardInfo">
                        <span>🏁 ${lastRace.track}</span>
                        <span>📅 ${formatDate(lastRace.date)}</span>
                        <span>✅ ${lastRace.actualLaps}/${lastRace.scheduledLaps} Laps</span>
                    </div>

                </div>
                `
                : ""
            }

        </section>
    `;

}
