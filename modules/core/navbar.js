import { ROUTES,getCurrentPage } from "../../config/routes.js";

export function createNavbar(){

    const current=getCurrentPage();

    const active=(page)=>current===page?"active":"";

    return `
        <nav class="navbar">

    <a class="active">
        🏠
        <span>Inicio</span>
    </a>

    <a id="sportsMenu">
        🏅
        <span>Deportes ▼</span>
    </a>

    <a>
        📰
        <span>Noticias</span>
    </a>

    <a>
        ℹ️
        <span>Acerca</span>
    </a>

</nav>
    `;

}
