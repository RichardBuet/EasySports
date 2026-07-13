import { NASCAR } from "../services/site.js";

const output = document.getElementById("output");
const button = document.getElementById("load");
const endpoint = document.getElementById("endpoint");

console.log("Explorer iniciado");

button.addEventListener("click", async () => {

    try {

        let data;

        switch (endpoint.value) {

            case "nascar-live":
                data = await NASCAR.getLiveRace();
                renderRace(data);
                break;

//   case "nascar-weekend":
 //   data = await NASCAR.getWeekend(5615);
 //   break;
case "nascar-weekend":
    data = await NASCAR.getWeekend(5615);
    renderWeekend(data);
    break;
       //     case "nascar-results":
       //         data = await NASCAR.getResults();
       //         break;

        //    case "nascar-racelist":
       //         data = await NASCAR.getRaceList();
        //        break;

        //    default:
        //        output.textContent = "Endpoint no válido";
        //        return;

        }

    //    output.textContent = JSON.stringify(data, null, 2);

    } catch (error) {

        console.error(error);

        output.textContent = `ERROR

${error.message}`;

    }

});

function renderRace(data) {

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

    data.leaderboard.forEach(driver => {

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


function renderWeekend(data){

    const raceInfo = document.getElementById("raceInfo");
    const table = document.getElementById("tableContainer");

    raceInfo.innerHTML = `
        <h2>🏁 ${data.race}</h2>

        <p><strong>📍 Circuito:</strong> ${data.track}</p>

        <p><strong>🥇 Ganador:</strong>
        ${data.winner} (#${data.car})</p>

        <p><strong>🏎 Marca:</strong> ${data.manufacturer}</p>

        <p><strong>👥 Equipo:</strong> ${data.team}</p>

        <p><strong>⚠ Amarillas:</strong> ${data.cautions}</p>

        <p><strong>⚡ Velocidad Promedio:</strong>
        ${data.averageSpeed} mph</p>

        <p><strong>🏆 Margen:</strong>
        ${data.margin} s</p>
    `;

    let html = `
    <table border="1" cellspacing="0" cellpadding="5">

        <tr>
            <th>Pos</th>
            <th>#</th>
            <th>Piloto</th>
            <th>Marca</th>
            <th>Pts</th>
        </tr>
    `;

    data.leaderboard.forEach(driver => {

        html += `
        <tr>

            <td>${driver.position}</td>

            <td>${driver.number}</td>

            <td>${driver.driver}</td>

            <td>${driver.manufacturer}</td>

            <td>${driver.points}</td>

        </tr>
        `;

    });

    html += "</table>";

    table.innerHTML = html;

}
