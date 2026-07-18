import { NASCAR } from "../services/site.js";
import { state } from "../config/state.js";

const output = document.getElementById("output");
const button = document.getElementById("load");
const endpoint = document.getElementById("endpoint");
const series = document.getElementById("series");

console.log("Explorer iniciado");

button.addEventListener("click", async () => {

    try {
        state.nascarSeries = Number(series.value);
        let data;
        switch (endpoint.value) {
            case "nascar-live":
                data = await NASCAR.getLiveRace();
                renderRace(data);
                break;


case "nascar-weekend":
    const nextRace = await NASCAR.getNextRace();
    data = await NASCAR.getWeekend(nextRace.raceId);
    renderWeekend(data);
    break;

           case "nascar-racelist":
           data = await NASCAR.getRaceList();
           renderRaceList(data);
    break;

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


function renderRaceList(data) {

    const raceInfo = document.getElementById("raceInfo");
    const table = document.getElementById("tableContainer");

    const completed = data.filter(r => r.completed).length;
    const pending = data.length - completed;

    const lastRace = [...data]
        .filter(r => r.completed)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    const nextRace = [...data]
        .filter(r => !r.completed)
        .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    raceInfo.innerHTML = `
        <h2>🏁 NASCAR Cup Series 2026</h2>

        <p><strong>Total carreras:</strong> ${data.length}</p>
        <p><strong>Finalizadas:</strong> ${completed}</p>
        <p><strong>Pendientes:</strong> ${pending}</p>

        <hr>

        <p><strong>🏁 Última carrera:</strong><br>
        ${lastRace ? lastRace.name : "-"}</p>

        <p><strong>📅 Próxima carrera:</strong><br>
        ${nextRace ? nextRace.name : "-"}</p>
    `;

    let html = `
    <table border="1" cellspacing="0" cellpadding="5">
        <tr>
            <th>Fecha</th>
            <th>Carrera</th>
            <th>Circuito</th>
            <th>Vueltas</th>
            <th>Estado</th>
        </tr>
    `;

    data.forEach(race => {

        html += `
        <tr>
            <td>${new Date(race.date).toLocaleDateString("es-AR")}</td>
            <td>${race.name}</td>
            <td>${race.track}</td>
            <td>${race.scheduledLaps}</td>
            <td>${race.status === "completed"
    ? "🏁 Finalizada"
    : "📅 Pendiente"}</td>
            </tr>
        `;

    });

    html += "</table>";

    table.innerHTML = html;

    output.textContent = "";

}


