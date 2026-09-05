const sports = [
    {
        label: "Fórmula 1",
        icon: "🏎",
        href: "https://richardbuet.github.io/EasySports/pages/formula1.html"
    },
    {
        label: "Nascar",
        icon: "🏁",
        href: "https://richardbuet.github.io/EasySports/pages/nascar.html"
    },
    {
        label: "MotoGP",
        icon: "🏍",
        href: "#"
    },
    {
        label: "IndyCar",
        icon: "🚗",
        href: "#"
    },
    {
        label: "Fórmula E",
        icon: "⚡",
        href: "#"
    },
    {
        label: "WEC",
        icon: "🏆",
        href: "#"
    },
    {
        label: "Copa del Mundo",
        icon: "⚽",
        href: "https://richardbuet.github.io/whatscup/"
    },
    // {
    //     label: "NBA",
    //     icon: "🏀",
    //     href: "#"
    // },
    // {
    //     label: "Tenis",
    //     icon: "🎾",
    //     href: "#"
    // }
];

export function getSports() {
    return sports;
}

export function createSportsMenu() {
    return `
        <div id="sportsMenuPanel" class="sports-menu">
            ${sports.map(sport => `
                <a href="${sport.href}">
                    ${sport.icon} ${sport.label}
                </a>
            `).join("")}
        </div>
    `;
}
