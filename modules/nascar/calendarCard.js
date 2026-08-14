import { NASCAR } from "../../services/site.js";

export async function createCalendarCard() {

    const timeline = await NASCAR.getTimeline();

    const races = timeline.all;
    const currentIndex = timeline.currentIndex;

    requestAnimationFrame(() => {
    document
        .getElementById(`race-${currentIndex}`)
        ?.scrollIntoView({
            block: "center",
            behavior: "auto"
        });
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
                        "
                        id="race-${index}"
                        data-race-id="${race.raceId}"
                        data-completed="${race.completed}"
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


                        <strong
                            title="${status.title}">
                            ${status.icon}
                        </strong>

                    </div>

                `;

            }).join("")}

        </div>

    </section>

    `;

}
