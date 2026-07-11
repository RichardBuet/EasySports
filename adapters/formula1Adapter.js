import {ESPNCore} from "../services/espn/core.js";

export async function adaptDriverStandings(data){

const standings=[];

for(const item of data.standings){

const athlete=await ESPNCore.getByUrl(item.athlete.$ref);
const stats=item.records[0].stats;

standings.push({

rank:stats.find(s=>s.name==="rank")?.value,
driver:athlete.displayName,
shortName:athlete.shortName,
points:stats.find(s=>s.name==="championshipPts")?.value,
wins:stats.find(s=>s.name==="wins")?.value,
country:athlete.country?.name,
flag:athlete.flag?.href,
headshot:athlete.headshot?.href

});

}

return standings;

}
