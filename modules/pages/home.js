import { createLayout } from "../core/layout.js";
import { createCard } from "../components/card.js";
import { createHero } from "../components/hero.js";
import { createF1Standings } from "../formula1/standings.js";
import { ROUTES } from "../../config/routes.js";

export function renderHome() {
return createLayout(`

    ${createHero()}
    ${createF1Standings()}
    
    <section class="container">

        <h2>Explorá nuestros deportes</h2>

        <div class="cards-grid">

            ${createCard(
                "World Cup",
                "Fixture, grupos, posiciones y estadísticas.",
                ROUTES.WORLDCUP
            )}

            ${createCard(
                "Formula 1",
                "Calendario, pilotos y clasificación.",
                ROUTES.FORMULA1
            )}

            ${createCard(
                "Noticias",
                "Últimas novedades deportivas.",
                ROUTES.NEWS
            )}

            ${createCard(
                "Acerca de",
                "Conocé más sobre el proyecto EasySports.",
                ROUTES.ABOUT
            )}

        </div>

    </section>

`);
}
