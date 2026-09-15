import { ROUTES } from "../../config/routes.js";
import { getSports } from "./sportsMenu.js";

export function createNavbar(){
    const sports = getSports();
    const currentPath = window.location.pathname.replace(/\/+$/,"") || "/";
    const homePath = new URL(ROUTES.HOME,window.location.origin).pathname.replace(/\/+$/,"") || "/";
    const normalizePath = path => path.replace(/\/+$/,"") || "/";
    const isActive = href => {
        if(!href || href === "#") return false;
        try{
            const url = new URL(href,window.location.origin);
            if(url.origin !== window.location.origin) return false;
            const targetPath = normalizePath(url.pathname);
            if(targetPath === homePath){
                return normalizePath(currentPath) === homePath;
            }
            return normalizePath(currentPath) === targetPath;
        }catch{
            return false;
        }
    };
    const activeClass = href => isActive(href) ? "active" : "";
    const renderSport = sport => `
        <a href="${sport.href}" class="${activeClass(sport.href)}">
            ${sport.image
                ? `<img src="${sport.image}" alt="" class="navbar-icon">`
                : `<span class="navbar-emoji">${sport.icon}</span>`
            }
            <span>${sport.label}</span>
        </a>
    `;
    return `
        <nav class="navbar">
            <div class="navbar-desktop">
                <a href="${ROUTES.HOME}" class="${activeClass(ROUTES.HOME)}">
                    ${getHomeIcon()}
                    <span>Inicio</span>
                </a>
                ${sports.map(renderSport).join("")}
            </div>
            <div class="navbar-mobile">
                <a href="${ROUTES.HOME}" class="${activeClass(ROUTES.HOME)}">
                    ${getHomeIcon()}
                    <span>Inicio</span>
                </a>
                ${sports.map(renderSport).join("")}
            </div>
        </nav>
    `;
}

function getHomeIcon(){
    return `<img src="${new URL("../../assets/images/favicon.png",import.meta.url).href}" alt="" class="navbar-icon">`;
}
