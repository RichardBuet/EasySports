import { createToday } from "../home/today.js";
import { createLayout } from "../core/layout.js";
import { createCard } from "../components/card.js";
import { createHero } from "../components/hero.js";
//import { createLive } from "../home/live.js";
//import { renderStandings } from "../formula1/standings.js";
import { createDashboard } from "../home/dashboard.js";
import { ROUTES } from "../../config/routes.js";

export async function renderHome() {

return createLayout(`
${createHero()}
${createToday()}
${await createDashboard()}

<section class="container">

    <h2>Explorar deportes</h2>

    <div class="cards-grid">

        ${createCard(
            "🏁 NASCAR",
            "Cup, O'Reilly y Craftsman Truck Series.",
            ROUTES.NASCAR
        )}

        ${createCard(
            "🏎 Formula 1",
            "Calendario, pilotos y clasificación.",
            ROUTES.FORMULA1
        )}

        ${createCard(
            "🏍 MotoGP",
            "MotoGP, Moto2 y Moto3.",
            ROUTES.MOTOGP
        )}

        ${createCard(
            "⚽ World Cup",
            "Fixture, grupos y estadísticas.",
            ROUTES.WORLDCUP
        )}

    </div>

</section>


    `);

}
