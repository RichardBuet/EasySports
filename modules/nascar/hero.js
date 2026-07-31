import { NASCAR } from "../../services/site.js";

export async function createNascarHero() {
    
    const heroState = await NASCAR.getHeroState();
    const hero = heroState.data;
    const seriesName = NASCAR.getSeriesName();
    
let heroCategory = `🏁 ${seriesName}`;

switch (heroState.state) {
    case "TODAY":
        heroCategory = `🔥 ${seriesName} · HOY HAY CARRERA`;
        break;
    case "LIVE":
        heroCategory = `🔴 ${seriesName} · EN VIVO`;
        break;
    case "FINISHED":
        heroCategory = `🏁 ${seriesName} · CARRERA FINALIZADA`;
        break;
}

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
    ${heroCategory}
    <span
        class="heroRaceCenter"
        onclick="window.openLiveRaceModal()">
        📊 Race Center
    </span>
</span>

            <h1>${hero.title}</h1>
            <p>${hero.subtitle}</p>
        <div class="heroMeta">
            ${hero.meta.map(item => `
            <div
                class="heroItem ${item.live ? "heroLive" : ""}"
                ${item.live ? 'onclick="window.openLiveRaceModal()"' : ""}>
                <span>${item.icon}</span>
                <strong>${item.value}</strong>
            </div>
        `).join("")}
        </div>
        </div>
    </section>
`;

}
