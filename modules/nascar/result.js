import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

window.openRaceResult = async () => {

    const race = await NASCAR.getCurrentWeekend();

    openModal({

        title: "Resultado de la carrera",

        content: await createRaceResultContent(race)

    });

};

async function createRaceResultContent(race){
console.log(race.leaderboard[0]);
    return `

        <div class="live-summary">

            <div class="live-item">
                <span>📍 Circuito:</span>
                <strong>${race.track}</strong>
            </div>

            <div class="live-item">
                <span>🥇 Ganador:</span>
                <strong>${race.winner} (#${race.car})</strong>
            </div>

            <div class="live-item">
                <span>🏎️ Marca:</span>
                <strong>${race.manufacturer}</strong>
            </div>

            <div class="live-item">
                <span>👥 Equipo:</span>
                <strong>${race.team}</strong>
            </div>

            <div class="live-item">
                <span>🟡 Banderas Amarillas:</span>
                <strong>${race.cautions}</strong>
            </div>

            <div class="live-item">
                <span>⚡ Velocidad Promedio:</span>
                <strong>${race.averageSpeed} mph</strong>
            </div>

            <div class="live-item">
                <span>🏆 Margen del ganador:</span>
                <strong>${race.margin} s</strong>
            </div>

        </div>

        <div class="driver-header">

            <span>POS</span>

            <span>#</span>

            <span>PILOTOS</span>

            <span>PTS</span>

        </div>

        <div class="driver-list">

            ${race.leaderboard.map(driver => `

                <div class="driver-row">

                    <span>#${driver.position}</span>

                    <span>${driver.number}</span>

                    <span>${driver.driver}</span>

                    <strong>${driver.points}</strong>

                </div>

            `).join("")}

        </div>

    `;

}
