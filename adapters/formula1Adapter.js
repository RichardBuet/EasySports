export function adaptDriverStandings(data){

return data.standings.map(item=>{

const stats=item.records[0].stats;

return{

rank:stats.find(s=>s.name==="rank")?.value,
points:stats.find(s=>s.name==="championshipPts")?.value,
wins:stats.find(s=>s.name==="wins")?.value,
athlete:item.athlete.$ref

};

});

}
