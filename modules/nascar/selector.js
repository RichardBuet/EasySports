import { state } from "../../config/state.js";
import { NASCAR_SERIES } from "../../config/series.js";

export function createNascarSelector(){

    return `
        <section class="container">
            <div id="nascar-selector" class="nascar-selector">
                <button class="${state.nascarSeries===NASCAR_SERIES.CUP?"active":""}" data-series="1">
                    🏁 Cup </button>
                <button class="${state.nascarSeries===NASCAR_SERIES.OREILLY?"active":""}" data-series="2">
                    🟢 O'Reilly </button>
                <button class="${state.nascarSeries===NASCAR_SERIES.TRUCK?"active":""}" data-series="3">
                    🚛 Truck </button>
            </div>
        </section>
    `;
}
