import { createWidget } from "../components/widget.js";

export function createLive(){

    const content=`

        <div class="live-list">

            <div class="live-row">
                <span class="live-status">🔴 EN VIVO</span>
                <span>🏎 FP2 • Bélgica</span>
            </div>

            <div class="live-row">
                <span class="live-status">78'</span>
                <span>⚽ Argentina 2-1 Brasil</span>
            </div>

            <div class="live-row">
                <span class="live-status">Q4</span>
                <span>🏀 Lakers 89-84 Celtics</span>
            </div>

            <div class="live-row">
                <span class="live-status">10:30</span>
                <span>🏍 Qualifying • Alemania</span>
            </div>

        </div>

    `;

    return createWidget("🔴 En Vivo",content);

}
