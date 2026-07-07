import { createHeader } from "../core/header.js";
import { createNavbar } from "../core/navbar.js";
import { createFooter } from "../core/footer.js";
import { createCard } from "../core/card.js";
import { ROUTES } from "../../config/routes.js";

export function renderHome() {
    return `
        ${createHeader()}
        ${createNavbar()}

<main class="container">

    <h1>Bienvenido a EasySports</h1>

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

</main>

        ${createFooter()}
    `;
}
