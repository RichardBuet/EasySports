import {ESPNCore,ESPNSite} from "../services/espn/index.js";

const output=document.getElementById("output");

document.getElementById("load").onclick=async()=>{

const option=document.getElementById("endpoint").value;

let data=null;

switch(option){

case"driver":
data=await ESPNCore.getDriverStandings();
break;

case"constructor":
data=await ESPNCore.getConstructorStandings();
break;

case"calendar":
data=await ESPNCore.getCalendar();
break;

case"events":
data=await ESPNCore.getEvents();
break;

case"news":
data=await ESPNSite.getNews();
break;

}

const athlete=await ESPNCore.getByUrl(data.standings[0].athlete.$ref);

output.textContent=JSON.stringify(athlete,null,2);

};
