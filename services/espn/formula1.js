import {ESPNCore} from "./core.js";

export class ESPNFormula1{

    static async getStandings(){

        const data=await ESPNCore.getDriverStandings();

        return data.standings;

    }

    static async getConstructors(){

        const data=await ESPNCore.getConstructorStandings();

        return data.standings;

    }

    static async getCalendar(){

        return await ESPNCore.getCalendar();

    }

    static async getEvents(){

        return await ESPNCore.getEvents();

    }

}
