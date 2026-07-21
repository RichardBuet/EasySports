import { NASCAR } from "../../services/site.js";

export async function createCalendarCard() {

    const timeline = await NASCAR.getTimeline(2);

    const previous = timeline.previous;
    const current = timeline.current;
    const next = timeline.next;

    return `

    <section class="calendarCard"">

        <h2 class="h2-NSC">Schedule</h2>

        ${previous.map(race => `
            <div class="calendarItem completed">
                <strong>▼ ${race.track}</strong>
                <span>(Finalizada)</span>
                <small>
                    ${formatDate(race.date)}
                    ·
                    Ganó ${race.winner || "-"}
                </small>
            </div>
        `).join("")}

        <hr>

        <div class="calendarItem current">
            <strong>⭐ ${current.track}</strong>
            <span>(PRÓXIMA)</span>
            <small>
                ${formatDate(current.date)}
                ·
                ${formatTime(current.date)}
            </small>
        </div>

        <hr>

        ${next.map(race => `
            <div class="calendarItem next">
                <strong>▲ ${race.track}</strong>
                <small>
                    ${formatDate(race.date)}
                    ·
                    Próxima carrera
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
