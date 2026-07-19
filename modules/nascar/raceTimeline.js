import { NASCAR } from "../services/site.js";

export function renderRaceTimeline(timeline,raceInfo,container){

const races=timeline.all;
const completed=races.filter(r=>r.completed).length;
const pending=races.length-completed;
const lastRace=timeline.previous.at(-1);
const nextRace=timeline.current;

raceInfo.innerHTML=`
<h2>🏁 NASCAR ${NASCAR.getSeriesName()} 2026</h2>
<p><strong>Total carreras:</strong> ${races.length}</p>
<p><strong>Finalizadas:</strong> ${completed}</p>
<p><strong>Pendientes:</strong> ${pending}</p>
<hr>
<p><strong>🏁 Última carrera:</strong><br>${lastRace?lastRace.name:"-"}</p>
<p><strong>📅 Próxima carrera:</strong><br>${nextRace?nextRace.name:"-"}</p>
`;

let html=`<div class="race-timeline">`;

timeline.previous.forEach(race=>{
html+=`
<div class="timeline-item previous">
<div>▼ <strong>${race.name}</strong></div>
<div>${new Date(race.date).toLocaleDateString("es-AR",{day:"numeric",month:"short"})}</div>
<div>${race.track}</div>
</div>
`;
});

if(timeline.current){
html+=`
<div class="timeline-item current">
<div>⭐ <strong>${timeline.current.name}</strong></div>
<div>${new Date(timeline.current.date).toLocaleDateString("es-AR",{day:"numeric",month:"short"})}</div>
<div>${timeline.current.track}</div>
</div>
`;
}

timeline.next.forEach(race=>{
html+=`
<div class="timeline-item next">
<div>▲ <strong>${race.name}</strong></div>
<div>${new Date(race.date).toLocaleDateString("es-AR",{day:"numeric",month:"short"})}</div>
<div>${race.track}</div>
</div>
`;
});

html+=`
<div class="timeline-footer">
Ver campeonato completo ▼
</div>
`;

html+=`</div>`;

container.innerHTML=html;

}
