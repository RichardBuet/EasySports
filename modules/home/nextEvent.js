import { NASCAR } from "../../services/site.js";
import { createWidget } from "../components/widget.js";

export async function createNextEvent(){

    const nextRace=await NASCAR.getNextRace();

    const content=`

        <div class="today-row">
            <span>🏁 ${nextRace.name}</span>
            <span>${new Date(nextRace.date).toLocaleDateString("es-AR",{
                day:"numeric",
                month:"short"
            })}</span>
        </div>

        <div class="today-row">
            <span>🏟 ${nextRace.track}</span>
            <span>Próximamente</span>
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
