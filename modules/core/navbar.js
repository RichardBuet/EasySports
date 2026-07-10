import { ROUTES,getCurrentPage } from "../../config/routes.js";
import { createSportsMenu } from "./sportsMenu.js";

export function createNavbar(){

    const current=getCurrentPage();
    const active=(page)=>current===page?"active":"";

    return `
        <nav class="navbar">

            <a href="${ROUTES.HOME}" class="${active("home")}">
                🏠
                <span>Inicio</span>
            </a>

            <a id="sportsMenu">
                🏅
                <span>Deportes ▼</span>
            </a>

            <a href="${ROUTES.NEWS}" class="${active("news")}">
                📰
                <span>Noticias</span>
            </a>

            <a href="${ROUTES.ABOUT}" class="${active("about")}">
                ℹ️
                <span>Acerca</span>
            </a>

        </nav>

        ${createSportsMenu()}
    `;

}
