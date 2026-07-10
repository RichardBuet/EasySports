import { createWidget } from "../components/widget.js";

export function createToday() {

    const content = `

        <div class="today-list">

            <div class="today-row">
                <span>09:00</span>
                <span>🏎 FP2 • Bélgica</span>
            </div>

            <div class="today-row">
                <span>13:30</span>
                <span>🏍 Clasificación • Alemania</span>
            </div>

            <div class="today-row">
                <span>18:00</span>
                <span>⚽ Argentina vs Brasil</span>
            </div>

            <div class="today-row">
                <span>21:30</span>
                <span>🏀 Lakers vs Celtics</span>
            </div>

        </div>

    `;

    return createWidget("📅 Hoy", content);

}
