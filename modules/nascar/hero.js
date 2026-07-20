import { NASCAR } from "../../services/site.js";

export async function createNascarHero() {

    const hero = await NASCAR.getHeroData();
    const seriesName = NASCAR.getSeriesName();

    const date = new Date(hero.date);

    const raceDate = date.toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short"
    });

    const raceTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    return `
    <section class="nascarHero">

        <div class="nascarHeroOverlay"></div>

        <div class="nascarHeroContent">

            <span class="heroCategory">
                ${seriesName}
            </span>

            <h1>${hero.title}</h1>
            <p>${hero.subtitle}</p>

        <div class="heroMeta">

  <!--          ${hero.meta.map(item => `
                <div class="heroItem">
                    <span>${item.icon}</span>
                    <strong>${item.value}</strong>
                </div>
            `).join("")}
-->
            ${hero.meta.map(item => `
            <div
                class="heroItem ${item.live ? "heroLive" : ""}"
                ${item.live ? 'onclick="window.openLiveRace()"' : ""}>
                <span>${item.icon}</span>
                <strong>${item.value}</strong>
            </div>
        `).join("")}
        </div>

        </div>

    </section>
`;

}
