import {ESPNCore} from "./core.js";

export class ESPNFormula1{

static async getStandings(){

const data=await ESPNCore.getDriverStandings();

const standings=[];

for(const item of data.standings){

const athlete=await ESPNCore.getByUrl(item.athlete.$ref);

const stats=item.records[0].stats;

standings.push({

rank:stats.find(s=>s.name==="rank")?.value,
points:stats.find(s=>s.name==="championshipPts")?.value,
wins:stats.find(s=>s.name==="wins")?.value,
athlete

});

}

return standings;

}

}
