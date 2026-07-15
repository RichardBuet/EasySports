import { NASCAR } from "../../services/site.js";
export function createNascarHero(){

const race=await NASCAR.getRaceList();
const nextRace=race.find(r=>!r.completed);
    return `
        <section class="hero nascar-hero">
            <div class="hero-content">
                <span class="hero-category">🏁 NASCAR Cup Series</span>
                <h1>${nextRace.name}</h1>
                <p>📍 ${nextRace.track}</p>
                <div class="hero-info">
                    <span>🗓 ${new Date(nextRace.date).toLocaleDateString("es-AR")}</span>
                </div>
            </div>
        </section>
    `;
}
