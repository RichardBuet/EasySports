import { NASCAR } from "../../services/site.js";


export function centerCalendarCurrentRace(currentIndex) {

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
}



export async function createCalendarCard() {

    const timeline =
        await NASCAR.getTimeline();

    const races =
        timeline.all;

    const currentIndex =
        timeline.currentIndex;

    const currentRace =
        races[currentIndex];


    /* =====================================================
       CARRERAS A MOSTRAR

       2 finalizadas
       + carrera actual
       + 2 posteriores
       ===================================================== */

    const previousRaces =
        races
            .slice(0, currentIndex)
            .filter(race => race.completed)
            .slice(-2);


    const nextRaces =
        races
            .slice(currentIndex)
            .filter(race => !race.completed)
            .slice(0, 3);


    const calendarRaces = [
        ...previousRaces,
        ...nextRaces
    ];


    console.log(
        "🏁 CALENDARIO TARJETA:",
        calendarRaces
    );


    return `

    <section class="calendarCard">

        <h2 class="h2-NSC">
            Calendario Nascar
        </h2>

        <div class="calendar-header">

            <span></span>
            <span>CARRERA</span>
            <span>CIRCUITO</span>
            <span>ESTADO</span>

        </div>

        <div class="calendar-list">

            ${calendarRaces.map((race, index) => {

                const isCurrent =
                    race.raceId === currentRace?.raceId;


                const status =
                    isCurrent
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
                            ${isCurrent ? "current" : ""}
                            ${race.completed ? "clickable" : ""}
                        "
                        id="race-${race.raceId}"
                        data-race-id="${race.raceId}"
                        data-completed="${race.completed}"

                        ${
                            race.completed
                                ? `onclick="window.openRaceResult(${race.raceId})"`
                                : `onclick="window.openRaceInfo(${race.raceId})"`
                        }
                    >

                        <span>

                            ${
                                race.date
                                    ? new Date(
                                        race.date
                                    ).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "2-digit"
                                        }
                                    )
                                    : "—"
                            }

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
