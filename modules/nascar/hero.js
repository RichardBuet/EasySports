import { NASCAR } from "../../services/site.js";

export async function createNascarHero() {

    const nextRace = await NASCAR.getNextRace();
    const seriesName = NASCAR.getSeriesName();

    return `
        <section class="nascarHero">

            <div class="nascarHeroOverlay"></div>

            <div class="nascarHeroContent">

                <span class="heroCategory">${seriesName}</span>

                <h1>${nextRace.name}</h1>

                <p>${nextRace.track}</p>

                <div class="heroInfo">

                    <span>${new Date(nextRace.date).toLocaleDateString()}</span>

                </div>

            </div>

        </section>
    `;

}
