import { NASCAR } from "../../services/site.js";
import { state } from "../../config/state.js";
import { NASCAR_SERIES } from "../../config/series.js";

export async function createNascarHero(){
    const race=await NASCAR.getRaceList();
    
    const category={
        [NASCAR_SERIES.CUP]:"Cup Series",
        [NASCAR_SERIES.OREILLY]:"O'Reilly Series",
        [NASCAR_SERIES.TRUCK]:"Craftsman Truck Series"
    };
    return `
        <section class="hero nascar-hero">
            <div class="hero-content">
                <span class="hero-category">
                    🏁 NASCAR ${category[state.nascarSeries]}
                </span>
                <h1>${nextRace.name}</h1>
                <p>📍 ${nextRace.track}</p>
                <div class="hero-info">
                    <span>
                        🗓 ${new Date(nextRace.date).toLocaleDateString("es-AR")}
                    </span>
                </div>
            </div>
        </section>
    `;
}
