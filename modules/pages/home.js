import { createHeader } from "../core/header.js";
import { createNavbar } from "../core/navbar.js";
import { createFooter } from "../core/footer.js";
import { createCard } from "../core/card.js";

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
            "pages/worldcup.html"
        )}

        ${createCard(
            "Formula 1",
            "Calendario, pilotos y clasificación.",
            "pages/formula1.html"
        )}

        ${createCard(
            "Noticias",
            "Últimas novedades deportivas.",
            "pages/news.html"
        )}

    </div>

</main>

        ${createFooter()}
    `;
}
