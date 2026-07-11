import {ESPNCore} from "./core.js";
import {adaptDriverStandings} from "../../adapters/formula1Adapter.js";
import {adaptConstructorStandings} from "../../adapters/formula1ConstructorAdapter.js";

export class ESPNFormula1{

static async getDriverStandings(){

const data=await ESPNCore.getDriverStandings();

return adaptDriverStandings(data);

}

static async getConstructorStandings(){

const data=await ESPNCore.getConstructorStandings();

return adaptConstructorStandings(data);

}

static async getCalendar(){

return await ESPNCore.getCalendar();

}

static async getEvents(){

return await ESPNCore.getEvents();

}

}
