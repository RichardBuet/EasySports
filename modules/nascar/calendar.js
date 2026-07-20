import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

window.openRaceCalendar = async () => {

    const timeline = await NASCAR.getTimeline();

    const races = timeline.all;
    const currentIndex = timeline.currentIndex;

    openModal({

        title: "Calendar",

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

        <div class="driver-header">

            <span>DATE</span>

            <span>RACE</span>

            <span>TRACK</span>

            <span>STATUS</span>

        </div>

        <div class="driver-list">

            ${races.map((race, index) => `

                <div
                    class="driver-row ${index === currentIndex ? "current" : ""}"
                    id="race-${index}">

                    <span>${new Date(race.date).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short"
                    })}</span>

                    <span>${race.name}</span>

                    <span>${race.track}</span>

                    <strong>

                        ${race.completed ? "🏁" : "📅"}

                    </strong>

                </div>

            `).join("")}

        </div>

    `;

}
