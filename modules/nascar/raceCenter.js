import { NASCAR } from "../../services/site.js";

export async function createRaceCenter() {

    const raceCenter = await NASCAR.getRaceCenterData();

    return `
        <section class="raceCenter">

            <h2>${raceCenter.type === "live" ? "🔴 Live Race" : "🏁 Last Race"}</h2>

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
        class="btn-secondary"
        onclick="window.openRaceResult()">

        🏆 Resultado

    </button>

</div>

        </section>
    `;

}
