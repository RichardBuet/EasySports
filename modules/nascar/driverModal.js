import { openModal } from "../components/modal.js";

export function showDriverModal(driver) {

    openModal({

        title: driver.driver,

        content: `
            <p>Driver ID: ${driver.driverId}</p>
            <p>Team: ${driver.profile?.team ?? "-"}</p>
        `

    });

}
