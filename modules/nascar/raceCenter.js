import { NASCAR } from "../../services/site.js";

export async function createRaceCenter() {

    const raceCenter = await NASCAR.getRaceCenterData();

    return `
        <section class="raceCenter">

            <h2 class="h2-NSC">${raceCenter.type === "live" ? "🔴 Live Race" : "🏁 Última Carrera"}</h2>

            <h3>${raceCenter.title}</h3>

            ${raceCenter.winner?.name ? `
                <div class="raceWinner">

                    <strong>${raceCenter.winner.name}</strong>

                    ${raceCenter.winner.number
                        ? `<span>#${raceCenter.winner.number}</span>`
                        : ""
                    }

                    ${raceCenter.winner.team
                        ? `<small>${raceCenter.winner.team}</small>`
                        : ""
                    }

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
        Ver Resultado de la carrera ►
    </button>

</div>

        </section>
    `;

}
