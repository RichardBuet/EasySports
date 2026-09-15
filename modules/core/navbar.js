import { ROUTES, getCurrentPage } from "../../config/routes.js";
import { getSports } from "./sportsMenu.js";

export function createNavbar(){
    const current = getCurrentPage();
    const sports = getSports();

    const getPageName = href => {
        try {
            return new URL(href, window.location.origin)
                .pathname
                .split("/")
                .pop() || "index.html";
        } catch {
            return "";
        }
    };

    const isActive = href => {
        if (!href || href === "#") return false;

        try {
            const url = new URL(href, window.location.origin);

            const appBase = new URL(
                ROUTES.HOME,
                window.location.origin
            ).pathname.replace(/\/$/, "");

            if (url.origin !== window.location.origin) return false;

            if (
                url.pathname !== appBase &&
                !url.pathname.startsWith(`${appBase}/`)
            ) {
                return false;
            }

            const page =
                url.pathname.split("/").pop() || "index.html";

            if (page === "index.html") {
                return current === "index.html" || current === "";
            }

            return current === page;

        } catch {
            return false;
        }
    };

    const activeClass = href =>
        isActive(href) ? "active" : "";

    const sportVisual = sport => `
        ${sport.image
            ? `<img src="${sport.image}" alt="${sport.label}">`
            : sport.icon
        }
        <span>${sport.label}</span>
    `;

    return `
        <nav class="navbar">

            <div class="navbar-desktop">

                <a href="${ROUTES.HOME}"
                   class="${activeClass(ROUTES.HOME)}">

                    <img
                        src="/EasySports/assets/icons/favicon-32x32.png"
                        alt="EasySports"
                    >

                    <span>Inicio</span>
                </a>

                ${sports.map(sport => `
                    <a
                        href="${sport.href}"
                        class="${activeClass(sport.href)}"
                    >
                        ${sportVisual(sport)}
                    </a>
                `).join("")}

            </div>


            <div class="navbar-mobile">

                <a
                    href="${ROUTES.HOME}"
                    class="${activeClass(ROUTES.HOME)}"
                >
                    <img
                        src="/EasySports/assets/icons/favicon-32x32.png"
                        alt="EasySports"
                    >

                    <span>Inicio</span>
                </a>

                ${sports.map(sport => `
                    <a
                        href="${sport.href}"
                        class="${activeClass(sport.href)}"
                    >
                        ${sportVisual(sport)}
                    </a>
                `).join("")}

            </div>

        </nav>
    `;
}
