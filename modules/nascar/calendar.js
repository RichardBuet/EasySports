import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

window.openRaceCalendar = async () => {

    const timeline = await NASCAR.getTimeline();
    const races = timeline.all;
    const currentIndex = timeline.currentIndex;

    openModal({
        title: "Calendario",
        content: createCalendarContent(races, currentIndex)
    });

    requestAnimationFrame(() => {
        document
            .getElementById(`race-${currentIndex}`)
            ?.scrollIntoView({
                block: "center",
                behavior: "auto"
            });
    });
};

function createCalendarContent(races, currentIndex) {

    return `
        <div class="calendar-header">
            <span>FECHA</span>
            <span>CARRERA</span>
            <span>CIRCUITO</span>
            <span>ESTADO</span>
        </div>

        <div class="driver-list">
            ${races.map((race, index) => {

                const status =
                    index === currentIndex
                        ? { icon: "⭐", title: "Próxima carrera" }
                        : race.completed
                            ? { icon: "🏁", title: "Finalizada" }
                            : { icon: "📅", title: "Programada" };

                return `
                    <div
                        class="calendar-row ${index === currentIndex ? "current" : ""}"
                        id="race-${index}">

                        <span>${new Date(race.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit"
                        })}</span>

                        <span>${race.name}</span>

                        <span>${race.track}</span>

                        <strong title="${status.title}">
                            ${status.icon}
                        </strong>

                    </div>
                `;
            }).join("")}
        </div>
    `;
}
