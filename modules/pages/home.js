import { createLayout } from "../core/layout.js";
import { createCard } from "../components/card.js";
import { createBunner } from "../components/bunner.js";
import { createDashboard } from "../home/dashboard.js";
import { ROUTES } from "../../config/routes.js";

export async function renderHome() {

    return createLayout(`
        ${createBunner()}

        ${await createDashboard()}

        <section class="container">

            <h2>Explorar deportes</h2>

            <div class="cards-grid">

            ${createCard(
                "🏁 NASCAR",
                "Cup, O'Reilly y Craftsman Truck Series.",
                ROUTES.NASCAR,
                "/EasySports/assets/images/nascar-card.png"
            )}
            
            ${createCard(
                "🏎 Formula 1",
                "Calendario, pilotos y clasificación.",
                ROUTES.FORMULA1,
                "/EasySports/assets/images/f1-card.png"
            )}
            
            ${createCard(
                "🏍 MotoGP",
                "MotoGP, Moto2 y Moto3.",
                ROUTES.MOTOGP,
                "/EasySports/assets/images/motogp-card.png"
            )}
            
            ${createCard(
                "⚽ World Cup",
                "Fixture, grupos y estadísticas.",
                ROUTES.WORLDCUP,
                "/EasySports/assets/images/futbol-card.png"
                )}

            </div>

        </section>
    `);

}
