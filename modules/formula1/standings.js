import { getF1Standings } from "../../js/api.js";

export async function renderStandings() {

    const data = await getF1Standings();

    const standings =
        data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    return `
        <section class="container">

            <h2>🏆 Campeonato de Pilotos</h2>

            <div class="cards-grid">

                ${standings.slice(0,10).map(driver=>`

                    <div class="card">

                        <h3>
                            ${driver.position}. ${driver.Driver.givenName}
                            ${driver.Driver.familyName}
                        </h3>

                        <p><strong>Equipo:</strong> ${driver.Constructors[0].name}</p>

                        <p><strong>Puntos:</strong> ${driver.points}</p>

                        <p><strong>Victorias:</strong> ${driver.wins}</p>

                    </div>

                `).join("")}

            </div>

        </section>
    `;

}
