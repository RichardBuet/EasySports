import { NASCAR } from "../../services/site.js";

export async function createCalendarCard() {

    const timeline = await NASCAR.getTimeline();

    const races = timeline.all;
    const currentIndex = timeline.currentIndex;

requestAnimationFrame(() => {

    requestAnimationFrame(() => {

        const calendarList =
            document.querySelector(".calendarCard .calendar-list");

        const currentRace =
            document.getElementById(`race-${currentIndex}`);

        if (!calendarList || !currentRace) return;

        const listRect =
            calendarList.getBoundingClientRect();

        const raceRect =
            currentRace.getBoundingClientRect();

        const racePosition =
            raceRect.top
            - listRect.top
            + calendarList.scrollTop;

        calendarList.scrollTop =
            racePosition
            - (calendarList.clientHeight / 2)
            + (currentRace.offsetHeight / 2);

    });

});
    
    return `

    <section class="calendarCard">

        <h2 class="h2-NSC">
            Calendario Nascar
        </h2>

        <div class="calendar-header">

            <span>FECHA</span>
            <span>CARRERA</span>
            <span>CIRCUITO</span>
            <span>ESTADO</span>

        </div>

        <div class="calendar-list">

            ${races.map((race, index) => {

                const status =
                    index === currentIndex
                        ? {
                            icon: "⭐",
                            label: "Próxima carrera"
                        }
                        : race.completed
                            ? {
                                icon: "🏁",
                                label: "Finalizada"
                            }
                            : {
                                icon: "📅",
                                label: "Programada"
                            };

                return `

                    <div
                        class="
                            calendar-row
                            ${index === currentIndex ? "current" : ""}
                            ${race.completed ? "clickable" : ""}
                        "
                        id="race-${index}"
                        data-race-id="${race.raceId}"
                        data-completed="${race.completed}"
                        ${race.completed
                            ? `onclick="window.openRaceResult(${race.raceId})"`
                            : ""}
                    >

                        <span>
                            ${new Date(race.date).toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "2-digit"
                                }
                            )}
                        </span>

<span>
    ${race.name}

    <small class="calendar-status">
        • ${status.label}
    </small>
</span>
                        <span>
                            ${race.track}
                        </span>

                        <strong title="${status.label}">
                            ${status.icon}
                        </strong>

                    </div>

                `;

            }).join("")}

        </div>

    </section>

    `;
}
