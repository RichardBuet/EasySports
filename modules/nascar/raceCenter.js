import { NASCAR } from "../../services/site.js";
// tarjeta (1) de última carrera.requiere cambio de nombre
export async function createRaceCenter() {
const raceCenter = await NASCAR.getRaceCenterData();

return `
    <section class="raceCenter">
        <h2 class="h2-NSC">
            ${raceCenter.type === "live" ? "🔴 Live Race" : "🏁 Última Carrera"}
        </h2>

        <h3>${raceCenter.title}</h3>
            ${raceCenter.date || raceCenter.track ? `
            
        <div class="raceInfo">
            ${raceCenter.date ? `<span>📅 ${raceCenter.date}</span>` : ""}
            ${raceCenter.track ? `<span>📍 ${raceCenter.track}</span>` : ""}
        </div>
        ` : ""}
             ${raceCenter.winner?.name ? `
        <div class="raceWinner">
            <div class="winnerHeader">
                <strong>
                    ${raceCenter.winner.number ? `#${raceCenter.winner.number}` : ""}
                    ${raceCenter.winner.name}
                </strong>

                ${raceCenter.winner.manufacturerLogo ? `<img
                    src="${raceCenter.winner.manufacturerLogo}"
                    alt="${raceCenter.winner.manufacturer}"
                   >`
                : ""}
            </div>

            ${raceCenter.winner.team? `<small> [Team: ${raceCenter.winner.team}]</small>` : ""}

            ${raceCenter.margin && raceCenter.second?.name ? `
                <span class="winnerMargin">
                    +${raceCenter.margin}Seg. sobre: ${raceCenter.second.name}
                </span>
            `
            : ""}

            </div>
        ` : ""}


        <div class="raceMeta">
            ${raceCenter.meta.map(item => `
                <div class="raceMetaItem">
                    <span>${item.icon}</span>
                    <strong>${item.value}</strong>
                </div>
            `).join("")}
        </div>

        <div class="raceActions">
            <button
                class="btn-nsc"
                onclick="window.openRaceResult()">
                Ver resultado completo ▼
            </button>
        </div>
    </section>
`;

}
