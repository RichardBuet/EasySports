import { getF1Standings } from "../../js/api.js";
import { createWidget } from "../components/widget.js";

export async function renderStandings() {

    const data = await getF1Standings();

    const standings =
        data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    const content = `

        <div class="standings-header">
            <span>POS</span>
            <span>PILOTO</span>
            <span>EQUIPO</span>
            <span>PTS</span>
        </div>

        ${standings.map(driver => `

            <div class="standing-row">

                <span class="pos">
                    ${driver.position}
                </span>

                <span class="driver">
                    ${driver.Driver.familyName}
                </span>

                <span class="team">
                    ${driver.Constructors[0].name}
                </span>

                <span class="points">
                    ${driver.points}
                </span>

            </div>

        `).join("")}

    `;

    return createWidget("🏆 Campeonato de Pilotos", content);

}
