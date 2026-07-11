import {ESPNCore} from "./core.js";
import {adaptDriverStandings} from "../../adapters/formula1Adapter.js";

export class ESPNFormula1{
static async getDriverStandings(){
const data=await ESPNCore.getDriverStandings();
return adaptDriverStandings(data);
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
