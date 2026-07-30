import { createSchedule } from "./schedule.js";

export async function createCalendarCard() {

    return `
        <section class="calendarCard">

            ${await createSchedule()}

        </section>
    `;

}
