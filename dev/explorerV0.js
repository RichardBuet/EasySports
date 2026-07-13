import { NASCAR } from "../services/site.js";

const output = document.getElementById("output");
const button = document.getElementById("load");
const endpoint = document.getElementById("endpoint");

console.log("Explorer iniciado");

button.addEventListener("click", async () => {

    try {

        let data;

switch(endpoint.value){

    case "nascar-live":

        data = await NASCAR.getLiveRace();

        renderRace(data);

        break;

    case "nascar-results":

        data = await NASCAR.getResults();

        break;

    case "nascar-racelist":

        data = await NASCAR.getRaceList();

        break;

}

output.textContent = JSON.stringify(data, null, 2);

        
    } catch (error) {

        console.error(error);

        output.textContent = `ERROR

${error.message}`;

    }

function renderRace(data){

    const raceInfo = document.getElementById("raceInfo");
    const table = document.getElementById("tableContainer");

    raceInfo.innerHTML = `
        <h2>🏁 NASCAR LIVE</h2>
        <p><strong>Bandera:</strong> ${data.flag}</p>
        <p><strong>Vuelta:</strong> ${data.lap} / ${data.totalLaps}</p>
        <p><strong>Restan:</strong> ${data.lapsToGo}</p>
    `;

    let html = `
    <table border="1" cellspacing="0" cellpadding="5">
        <tr>
            <th>Pos</th>
            <th>#</th>
            <th>Piloto</th>
            <th>Marca</th>
            <th>Gap</th>
        </tr>
    `;

    data.leaderboard.forEach(driver=>{

        html += `
        <tr>
            <td>${driver.position}</td>
            <td>${driver.number}</td>
            <td>${driver.driver}</td>
            <td>${driver.manufacturer}</td>
            <td>${driver.delta}</td>
        </tr>
        `;

    });

    html += "</table>";

    table.innerHTML = html;

}


    
});
