import {ESPNCore} from "../services/espn/core.js";

export async function adaptConstructorStandings(data){
console.log("DATA",data);
console.log("PRIMER ITEM",data.standings[0]);
return data;
}
// const standings=[];

// for(const item of data.standings){

// console.log(item);

// const manufacturer=await ESPNCore.getByUrl(item.manufacturer.$ref);

// console.log(manufacturer);

// const stats=item.records[0].stats;

// standings.push({

// rank:stats.find(s=>s.name==="rank")?.value,
// manufacturer

// });

// }

// return standings;

// }
