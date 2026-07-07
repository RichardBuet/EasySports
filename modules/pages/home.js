import { createHeader } from "../core/header.js";
import { createNavbar } from "../core/navbar.js";
import { createFooter } from "../core/footer.js";
import { createCard } from "../components/card.js";
import { ROUTES } from "../../config/routes.js";
import { createHero } from "../components/hero.js";

export function renderHome() {
    return `
        ${createHeader()}
        ${createNavbar()}

<main>

    ${createHero()}

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
</main>

        ${createFooter()}
    `;
}
