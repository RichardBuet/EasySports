import {ESPNCore} from "../services/espn/core.js";

export async function adaptConstructorStandings(data){

const standings=[];

for(const item of data.standings){

const manufacturer=await ESPNCore.getByUrl(item.manufacturer.$ref);

console.log(manufacturer);

const stats=item.records[0].stats;

standings.push({

rank:stats.find(s=>s.name==="rank")?.value,
manufacturer

});

}

return standings;

}
