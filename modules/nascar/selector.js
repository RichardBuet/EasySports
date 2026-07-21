import { state } from "../../config/state.js";
import { NASCAR_SERIES } from "../../config/series.js";

export function createNascarSelector(){

    return `
        <section class="container">
            <div id="nascar-selector" class="nascar-selector">
                <button id="btn-nsc-01" class="${state.nascarSeries === 1 ? "active" : ""}" data-series="1">
                    <img
                        src="https://www.nascar.com/wp-content/uploads/sites/7/2023/05/10/nascar_cup_series_logo.svg"
                        alt="Cup Series">
                </button>
                
                <button id="btn-nsc-02" class="${state.nascarSeries === 2 ? "active" : ""}" data-series="2">
                    <img
                        src="https://www.nascar.com/wp-content/uploads/sites/7/2025/09/30/NOAPS-Primary_FullColor-RGB.svg"
                        alt="O'Reilly Series">
                </button>
                
                <button id="btn-nsc-03" class="${state.nascarSeries === 3 ? "active" : ""}"  data-series="3">
                    <img
                        src="https://www.nascar.com/wp-content/uploads/sites/7/2023/05/10/nascar_craftsman_truck_series_logo.svg"
                        alt="Craftsman Truck Series">
                </button>
            </div>
        </section>
    `;
}
