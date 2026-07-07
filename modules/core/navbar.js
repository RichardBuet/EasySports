import { ROUTES } from "../../config/routes.js";

export function createNavbar() {

    return `

    <nav class="navbar">

        <a href="${ROUTES.HOME}">🏠 Inicio</a>

        <a href="${ROUTES.WORLDCUP}">🌍 World Cup</a>

        <a href="${ROUTES.FORMULA1}">🏎️ Formula 1</a>

        <a href="${ROUTES.NEWS}">📰 Noticias</a>

        <a href="${ROUTES.ABOUT}">ℹ️ Acerca</a>

    </nav>

    `;

}
