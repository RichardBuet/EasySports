import { NASCARDrivers } from "./drivers.js";
import { NASCARStandings } from "./standings.js";

export class NASCARDriverService {

    static #drivers = [];
    static #standings = [];
    static #driversMap = new Map();
    static #loaded = false;

    static async load(series = 1) {

        if (this.#loaded) return;

        const [drivers, standings] = await Promise.all([
            NASCARDrivers.getDrivers(),
            NASCARStandings.getStandings(series)
        ]);

        this.#drivers = drivers;
        this.#standings = standings;

        this.#driversMap = new Map(
            drivers.map(driver => [
                Number(driver.Driver_ID),
                driver
            ])
        );

        this.#loaded = true;

    }

    static getDriver(driverId) {

        const id = Number(driverId);

        const driver = this.#driversMap.get(id);

        const standing = this.#standings.find(
            s => Number(s.driver_id) === id
        );

        return {
            ...driver,
            ...standing
        };

    }

}
