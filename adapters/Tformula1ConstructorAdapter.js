export function adaptConstructorStandings(data){

return data.standings.map(item=>{
const stats=item.records[0].stats;
return{
rank:stats.find(s=>s.name==="rank")?.value,
points:stats.find(s=>s.name==="points")?.value,
wins:stats.find(s=>s.name==="wins")?.value,
teamId:item.team.$ref.split("/").slice(-1)[0].split("?")[0]

};

});

}


