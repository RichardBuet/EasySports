import { createSchedule } from "./calendar.js";

export async function createCalendarCard() {

    return `
        <section class="calendarCard">

            ${await createSchedule()}

        </section>
    `;

}
