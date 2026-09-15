const sports = [
    {
        label: "Fórmula 1",
        icon: "🏎",
        image: "/EasySports/assets/logos/f1-new.svg",
        href: "https://richardbuet.github.io/EasySports/pages/formula1.html"
    },
    {
        label: "Nascar",
        icon: "🏁",
        image: "/EasySports/assets/logos/nascar.svg",
        href: "https://richardbuet.github.io/EasySports/pages/nascar.html"
    },
    {
        label: "MotoGP",
        icon: "🏍",
        image: "/EasySports/assets/logos/motogp.svg",
        href: "#"
    },
    {
        label: "IndyCar",
        icon: "🚗",
        image: "/EasySports/assets/logos/indycar-series.svg",
        href: "#"
    },
{
    label: "Fórmula E",
    icon: "⚡",
    image: "/EasySports/assets/logos/formula-e.png",
    href: "#"
},
{
    label: "WEC",
    icon: "🏆",
    image: "/EasySports/assets/logos/wec.svg",
    href: "#"
},
{
    label: "Copa del Mundo",
    icon: "⚽",
    href: "https://richardbuet.github.io/whatscup/"
},
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
