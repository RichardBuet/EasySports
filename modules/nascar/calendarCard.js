import { NASCAR } from "../../services/site.js";

export async function createCalendarCard() {

    const timeline = await NASCAR.getTimeline();

    const races = timeline.all;
    const currentIndex = timeline.currentIndex;

    requestAnimationFrame(() => {

    const calendarList =
        document.querySelector(".calendar-list");

    const currentRace =
        document.getElementById(`race-${currentIndex}`);

    if (!calendarList || !currentRace) return;

    calendarList.scrollTop =
        currentRace.offsetTop
        - (calendarList.clientHeight / 2)
        + (currentRace.offsetHeight / 2);

});

    return `

    <section class="calendarCard">

        <h2 class="h2-NSC">
            Calendario
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
                            title: "Próxima carrera"
                        }
                        : race.completed
                            ? {
                                icon: "🏁",
                                title: "Finalizada"
                            }
                            : {
                                icon: "📅",
                                title: "Programada"
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
                        </span>

                        <span>
                            ${race.track}
                        </span>

                        <strong title="${status.title}">
                            ${status.icon}
                        </strong>

                    </div>

                `;

            }).join("")}

        </div>

    </section>

    `;
}
