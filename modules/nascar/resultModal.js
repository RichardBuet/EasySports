import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

window.openRaceResult = async (raceId) => {

    const race = await NASCAR.getWeekend(raceId);

    openModal({

        title: "Resultado de la carrera",

        content: await createRaceResultContent(race)

    });

};


async function createRaceResultContent(race) {

    console.log(race.leaderboard[0]);

return `

    <div class="race-result-track">

        <span>📍 Circuito</span>

        <strong>
            ${race.track}
        </strong>

    </div>


    <div class="race-result-summary">

        <div class="race-result-item">

            <span>🏁 Serie</span>

            <strong>
                ${race.series}
            </strong>

        </div>


        <div class="race-result-item">

            <span>🟡 Amarillas</span>

            <strong>
                ${race.cautions}
            </strong>

        </div>


        <div class="race-result-item">

            <span>⚡ Promedio</span>

            <strong>
                ${race.averageSpeed} mph
            </strong>

        </div>


        <div class="race-result-item">

            <span>🏆 Margen</span>

            <strong>
                ${race.margin} s
            </strong>

        </div>

    </div>


        <div class="race-result-driver-header">

            <span>POS</span>

            <span>#</span>

            <span>PILOTOS</span>

            <span>GAP</span>

            <span>PTS</span>

        </div>


        <div class="race-result-driver-list">

            ${race.leaderboard.map(driver => `

                <div class="race-result-driver-row">

                    <span>
                        #${driver.position}
                    </span>


                    <span>
                        ${driver.number}
                    </span>


                    <span
                        class="driver-link"
                        data-driver-id="${driver.driverId}">

                        <strong>

                            ${driver.driver}

                            ${
                                driver.manufacturerLogo
                                    ? `<img
                                        class="manufacturer-logo"
                                        src="${driver.manufacturerLogo}"
                                        alt="">`
                                    : ""
                            }

                        </strong>


                        ${
                            driver.team
                                ? `<small>${driver.team}</small>`
                                : ""
                        }

                    </span>


                    <span class="race-result-driver-gap">
                        ${driver.gap}
                    </span>


                    <strong>
                        ${driver.points}
                    </strong>

                </div>

            `).join("")}

        </div>

    `;

}
