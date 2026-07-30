import { F1 } from "../../services/siteF1.js";

function createDashboardCard(title, value, subtitle, icon) {

    return `
        <article class="dashboard-card">

            <span class="dashboard-card__icon">${icon}</span>

            <span class="dashboard-card__title">
                ${title}
            </span>

            <h3 class="dashboard-card__value">
                ${value}
            </h3>

            <span class="dashboard-card__subtitle">
                ${subtitle}
            </span>

        </article>
    `;

}

export async function createDashboard() {

    const [
        standings,
        constructors,
        schedule
    ] = await Promise.all([
        F1.getStandings(),
        F1.getConstructorStandings(),
        F1.getSchedule()
    ]);

    const leader = standings[0];
    const team = constructors[0];
    const nextRace = schedule[0];

    return `
        <section class="dashboard">

            <div class="dashboard-grid">

                ${createDashboardCard(
                    "Driver Leader",
                    leader.driver.fullName,
                    `${leader.points} pts`,
                    "🏎️"
                )}

                ${createDashboardCard(
                    "Team Leader",
                    team.constructor.name,
                    `${team.points} pts`,
                    "🏆"
                )}

                ${createDashboardCard(
                    "Next Race",
                    nextRace.raceName,
                    `Round ${nextRace.round}`,
                    "📅"
                )}

            </div>

        </section>
    `;

}
