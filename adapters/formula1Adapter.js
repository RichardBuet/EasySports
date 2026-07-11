import {ESPNCore} from "../services/espn/core.js";

export async function adaptDriverStandings(data){

return data.standings.map(item=>{

const stats=item.records[0].stats;

return{

id:item.athlete.$ref.split("/").slice(-1)[0].split("?")[0],
rank:stats.find(s=>s.name==="rank")?.value,
points:stats.find(s=>s.name==="championshipPts")?.value,
wins:stats.find(s=>s.name==="wins")?.value

};

});

}
