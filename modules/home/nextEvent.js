import { createWidget } from "../components/widget.js";

export function createNextEvent(){

    const content=`

        <div class="today-row">
            <span>🏁 NASCAR Cup</span>
            <span>19 Jul</span>
        </div>

        <div class="today-row">
            <span>🏟 North Wilkesboro</span>
            <span>19:00</span>
        </div>

        <div class="today-row">
            <span>Estado</span>
            <span>Programada</span>
        </div>

    `;

    return createWidget(
        "📅 Próximo evento",
        content
    );

}
