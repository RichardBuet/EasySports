import { createWidget } from "../components/widget.js";

export function createLastResult(){

    const content=`

        <div class="today-row">
            <span>🏁 NASCAR Cup</span>
            <span>12 Jul</span>
        </div>

        <div class="today-row">
            <span>🥇 Ryan Blaney</span>
            <span>#12 Ford</span>
        </div>

        <div class="today-row">
            <span>Quaker State 400</span>
            <span>Atlanta</span>
        </div>

    `;

    return createWidget(
        "🏆 Último resultado",
        content
    );

}
