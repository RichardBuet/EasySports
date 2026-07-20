import { NASCAR } from "../../services/site.js";
import { openModal } from "../components/modal.js";

window.openRaceCalendar = async () => {

    const races = await NASCAR.getRaceList();

    openModal({

        title: "Calendar",

        content: createCalendarContent(races)

    });

};

function createCalendarContent(races) {

    return `

        <div class="driver-header">

            <span>DATE</span>
            <span>RACE</span>
            <span>TRACK</span>
            <span>STATUS</span>

        </div>

        <div class="driver-list">

            ${races.map(race => `

                <div class="driver-row">

                    <span>${new Date(race.date).toLocaleDateString("en-US",{
                        day:"2-digit",
                        month:"short"
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
