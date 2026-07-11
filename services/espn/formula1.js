import { ESPNCore } from "./core.js";

export class ESPNFormula1{
    static async getDriverStandings(){
        return await ESPNCore.getDriverStandings();
    }
    static async getConstructorStandings(){
        return await ESPNCore.getConstructorStandings();
    }
    static async getCalendar(){
        return await ESPNCore.getCalendar();
    }
    static async getEvents(){
        return await ESPNCore.getEvents();
    }
}
