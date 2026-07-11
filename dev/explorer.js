import {ESPNFormula1} from "../services/espn/formula1.js";
import {ESPNCore} from "../services/espn/core.js";
import {ESPNSite} from "../services/espn/site.js";

const output=document.getElementById("output");
const button=document.getElementById("load");
const endpoint=document.getElementById("endpoint");

console.log("Explorer iniciado");

button.addEventListener("click",async()=>{

    try{

        let data;

        switch(endpoint.value){

            case"driver":
    data=await ESPNFormula1.getStandings();
    break;

            case"constructor":
    data=await ESPNFormula1.getConstructors();
    break;

case"calendar":
    data=await ESPNFormula1.getCalendar();
    break;

case"events":
    data=await ESPNFormula1.getEvents();
    break;
                
            case"athletes":
                data=await ESPNCore.getAthletes();
            break;

            case"news":
                data=await ESPNSite.getNews();
                break;

            default:
                output.textContent="Endpoint no válido";
                return;

        }

        output.textContent=JSON.stringify(data,null,2);

    }catch(error){

        console.error(error);

        output.textContent=
`ERROR

${error.message}`;

    }

});
