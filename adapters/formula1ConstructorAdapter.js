import {ESPNCore} from "../services/espn/core.js";

export async function adaptConstructorStandings(data){

const standings=[];

for(const item of data.standings){

const manufacturer=await ESPNCore.getByUrl(item.manufacturer.$ref);

const stats=item.records[0].stats;

standings.push({

rank:stats.find(s=>s.name==="rank")?.value,
constructor:manufacturer.displayName,
points:stats.find(s=>s.name==="points")?.value,
wins:stats.find(s=>s.name==="wins")?.value,
logo:manufacturer.logo?.href

});

}

return standings;

}
