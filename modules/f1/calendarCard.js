import { createSchedule } from "./calender.js";

export async function createCalendarCard() {

    return `
        <section class="calendarCard">

            ${await createSchedule()}

        </section>
    `;

}
