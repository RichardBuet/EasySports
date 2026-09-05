import { ROUTES, getCurrentPage } from "../../config/routes.js";
import { getSports } from "./sportsMenu.js";
export function createNavbar(){
    const current = getCurrentPage();
    const sports = getSports();
    const getPageName = href => {
        try {
            return new URL(href, window.location.origin).pathname.split("/").pop() || "index.html";
        } catch {
            return "";
        }
    };
    const isActive = href => {
    if (!href || href === "#") return false;
    const page = getPageName(href);
    if (page === "index.html") {
        return current === "index.html" || current === "";
    }
    return current === page;
};
    const activeClass = href => isActive(href) ? "active" : "";
    return `
        <nav class="navbar">
            <div class="navbar-desktop">
                <a href="${ROUTES.HOME}" class="${activeClass(ROUTES.HOME)}">
                    🏠 <span>Inicio</span>
                </a>
                ${sports.map(sport => `
                    <a href="${sport.href}" class="${activeClass(sport.href)}">
                        ${sport.icon} <span>${sport.label}</span>
                    </a>
                `).join("")}
            </div>
            <div class="navbar-mobile">
                <a href="${ROUTES.HOME}" class="${activeClass(ROUTES.HOME)}">
                    🏠 <span>Inicio</span>
                </a>
                ${sports.map(sport => `
                    <a href="${sport.href}" class="${activeClass(sport.href)}">
                        ${sport.icon} <span>${sport.label}</span>
                    </a>
                `).join("")}
            </div>
            <div class="navbar-extra">
                <a href="${ROUTES.NEWS}" class="${activeClass(ROUTES.NEWS)}">
                    📰 <span>Noticias</span>
                </a>
                <a href="${ROUTES.ABOUT}" class="${activeClass(ROUTES.ABOUT)}">
                    ℹ️ <span>Acerca</span>
                </a>
            </div>
        </nav>
    `;
}
