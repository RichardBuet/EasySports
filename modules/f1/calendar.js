import { F1 } from "../../services/siteF1.js";

export async function createCalendar() {

    const races = await F1.getSchedule();

    return `
        <section class="dashboard-card calendarCard">

            <h2>📅 Schedule</h2>

            <ul>
                ${races.map(race => `
                    <li>
                        R${race.round} - ${race.raceName}
                    </li>
                `).join("")}
            </ul>

        </section>
    `;

}
