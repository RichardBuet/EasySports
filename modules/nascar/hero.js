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

                    <div class="heroItem">
                        <span>📅</span>
                        <strong>${raceDate}</strong>
                    </div>

                    <div class="heroItem">
                        <span>🕒</span>
                        <strong>${raceTime}</strong>
                    </div>

                    <div class="heroItem">
                        <span>🏁</span>
                        <strong>${hero.scheduledLaps} Laps</strong>
                    </div>

                    <div class="heroItem heroStatus">
                        <span>${hero.status.icon}</span>
                        <strong>${hero.status.text}</strong>
                    </div>

                </div>

            </div>

        </section>
    `;

}
