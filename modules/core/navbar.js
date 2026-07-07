import { ROUTES,getCurrentPage } from "../../config/routes.js";

export function createNavbar(){

    const current=getCurrentPage();

    const active=(page)=>current===page?"active":"";

    return `
        <nav class="navbar">
            <a class="${active("index.html")}" href="${ROUTES.HOME}">🏠 Inicio</a>
            <a class="${active("worldcup.html")}" href="${ROUTES.WORLDCUP}">🌍 World Cup</a>
            <a class="${active("formula1.html")}" href="${ROUTES.FORMULA1}">🏎️ Formula 1</a>
            <a class="${active("news.html")}" href="${ROUTES.NEWS}">📰 Noticias</a>
            <a class="${active("about.html")}" href="${ROUTES.ABOUT}">ℹ️ Acerca</a>
        </nav>
    `;

}
