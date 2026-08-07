import { NASCAR } from "../../services/site.js";

export async function createCalendarCard() {

    const timeline = await NASCAR.getTimeline(2);

    const previous = timeline.previous;
    const current = timeline.current;
    const next = timeline.next;
                    // ·
                    // Ganó ${race.winner || "-"}
        // <hr>
    
    return `

    <section class="calendarCard">

        <h2 class="h2-NSC" style=" border-bottom: 1px solid #333;">Calendario</h2>

${previous.map(race => `

<div class="calendarItem completed">
    <strong>▼ ${race.track}</strong>
    <small>
        ${formatDate(race.date)} • Finalizada
    </small>
</div>
`).join("")}

<div class="calendarItem current" id="calendarCurrent">
    <strong>⭐ ${current.track}</strong>
    <small>
        ${formatDate(current.date)} • ${formatTime(current.date)}
    </small>
</div>

${next.map(race => `

<div class="calendarItem next">
    <strong>▲ ${race.track}</strong>
    <small>
        ${formatDate(race.date)} • Programada
    </small>
</div>
`).join("")}

        <button
            class="btn-nsc"
            onclick="window.openRaceCalendar()">
            Ver calendario completo ▼
        </button>

    </section>

    `;

}

function formatDate(date){
    return new Date(date).toLocaleDateString("es-AR",{
        day:"numeric",
        month:"short"
    });
}

function formatTime(date){
    return new Date(date).toLocaleTimeString("es-AR",{
        hour:"2-digit",
        minute:"2-digit"
    });
}
