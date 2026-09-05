import { ROUTES, getCurrentPage } from "../../config/routes.js";
import { createSportsMenu, getSports } from "./sportsMenu.js";

export function createNavbar() {
    const current = getCurrentPage();
    const active = page => current === page ? "active" : "";
    const sports = getSports();
    return `
        <nav class="navbar">
            <div class="navbar-desktop">
                <a href="${ROUTES.HOME}" class="${active("home")}">
                    🏠 <span>Inicio</span>
                </a>
                ${sports.map(sport => `
                    <a href="${sport.href}" class="${active(sport.href)}">
                        ${sport.icon} <span>${sport.label}</span>
                    </a>
                `).join("")}
            </div>
            <div class="navbar-mobile">
                <a href="${ROUTES.HOME}" class="${active("home")}">
                    🏠 <span>Inicio</span>
                </a>
                ${sports.slice(0, 5).map(sport => `
                    <a href="${sport.href}">
                        ${sport.icon} <span>${sport.label}</span>
                    </a>
                `).join("")}
            </div>
            <div class="navbar-extra">
                <a href="${ROUTES.NEWS}" class="${active("news")}">
                    📰 <span>Noticias</span>
                </a>
                <a href="${ROUTES.ABOUT}" class="${active("about")}">
                    ℹ️ <span>Acerca</span>
                </a>
            </div>
            ${createSportsMenu()}
        </nav>
    `;
}
