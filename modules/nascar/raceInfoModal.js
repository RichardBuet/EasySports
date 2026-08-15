import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

window.openRaceInfo = async (raceId) => {

    try {

        const race = await NASCAR.getWeekend(raceId);

        window.currentRace = race;

        openModal({
            title: "Información de la carrera",
            content: createRaceInfoContent(race)
        });

    } catch (error) {

    console.warn(
        "Información NASCAR todavía no disponible:",
        raceId
    );

    const timeline =
        await NASCAR.getTimeline();

    const race =
        timeline.all.find(
            race => race.raceId === raceId
        );

    if (!race) return;

    openModal({
        title: "Información de la carrera",
        content: `

            <div class="race-info">

                <div class="race-info-title">
                    🏁 ${race.name}
                </div>

                <div class="race-info-track">
                    📍 ${race.track}
                </div>

                <div class="race-info-date">
                    📅 ${
                        race.date
                            ? new Date(race.date)
                                .toLocaleDateString(
                                    "es-AR",
                                    {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric"
                                    }
                                )
                            : ""
                    }
                </div>

                <div class="race-empty">

                    <strong>
                        Información aún no disponible
                    </strong>

                    <small>
                        NASCAR todavía no publicó
                        los datos de este evento.
                    </small>

                </div>

            </div>

        `
    });

}

};


function createRaceInfoContent(race) {

    const practice =
        race.schedule?.find(event =>
            event.event_name
                ?.toLowerCase()
                .includes("practice")
        );

    const qualifying =
        race.schedule?.find(event =>
            event.event_name
                ?.toLowerCase()
                .includes("qualifying")
        );

    const raceEvent =
        race.schedule?.find(event =>
            event.event_name === "Race"
        );


    return `

        <div class="race-info">

            <div class="race-info-title">
                🏁 ${race.race}
            </div>

            <div class="race-info-track">
                📍 ${race.track}
            </div>


            <div class="race-info-grid">

                <div>
                    <small>VUELTAS</small>
                    <strong>${race.scheduledLaps}</strong>
                </div>

                <div>
                    <small>DISTANCIA</small>
                    <strong>${race.scheduledDistance} mi</strong>
                </div>

                <div>
                    <small>AUTOS</small>
                    <strong>${race.fieldSize}</strong>
                </div>

                <div>
                    <small>ETAPAS</small>
                    <strong>
    ${race.stage1Laps} /
    ${race.stage2Laps} /
    ${race.stage3Laps}
</strong>
                </div>

            </div>


            <h3>📅 ACTIVIDAD</h3>

            ${createScheduleItem(
                "🏎️",
                "Práctica",
                practice?.start_time_utc
            )}

            ${createScheduleItem(
                "⏱️",
                "Clasificación",
                qualifying?.start_time_utc
            )}

            ${createScheduleItem(
                "🏁",
                "Carrera",
                raceEvent?.start_time_utc
            )}


            <h3>🏆 RESULTADOS</h3>

            <div class="race-tabs">

                <button
                    class="race-tab active"
                    onclick="window.showRaceRun(0, this)">
                    PRÁCTICA
                </button>

                <button
                    class="race-tab"
                    onclick="window.showRaceRun(1, this)">
                    CLASIFICACIÓN
                </button>

            </div>


            <div id="raceRunResults">

                ${createRunResults(
                    race.weekendRuns?.[0]?.results ?? []
                )}

            </div>

        </div>

    `;

}


function createRunResults(results) {

    if (!results.length) {

        return `
            <div class="race-empty">
                No hay resultados disponibles.
            </div>
        `;

    }

    return `

        <div class="race-run-list">

            ${results.map(driver => `

                <div class="race-run-row">

                    <strong>
                        #${driver.position}
                    </strong>

                    <span>

                        ${driver.driver}

                        <small>
                            ${driver.manufacturer}
                            · #${driver.number}
                        </small>

                    </span>

                    <strong>
                        ${driver.bestLapTime ?? "-"}
                    </strong>

                </div>

            `).join("")}

        </div>

    `;

}


window.showRaceRun = (runIndex, button) => {

    const results =
        window.currentRace
            ?.weekendRuns?.[runIndex]
            ?.results ?? [];

    document.getElementById("raceRunResults").innerHTML =
        createRunResults(results);


    document
        .querySelectorAll(".race-tab")
        .forEach(tab =>
            tab.classList.remove("active")
        );


    button.classList.add("active");

};


function createScheduleItem(icon, title, date) {

    if (!date) return "";

    const d = new Date(date);

    return `

        <div class="race-schedule-item">

            <span class="schedule-icon">
                ${icon}
            </span>

            <span>

                <strong>${title}</strong>

                <small>

                    ${d.toLocaleDateString("es-AR", {
                        weekday: "short",
                        day: "numeric",
                        month: "short"
                    })}

                    ·

                    ${d.toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit"
                    })}

                </small>

            </span>

        </div>

    `;

}
