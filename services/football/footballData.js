import { fetchJSON } from "../shared/fetch.js";

const BASE_URL="";

export class FootballService{

    static async getCompetitions(){

        if(!BASE_URL){
            console.warn("Football API sin configurar.");
            return [];

        }

        return await fetchJSON(BASE_URL);

    }

}
