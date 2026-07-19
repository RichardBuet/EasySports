import { NASCAR } from "../services/site.js";
import { state } from "../config/state.js";
import { renderRaceTimeline } from "../modules/nascar/raceTimeline.js";

const output = document.getElementById("output");
const button = document.getElementById("load");
const endpoint = document.getElementById("endpoint");
const series = document.getElementById("series");

const raceInfo = document.getElementById("raceInfo");
const tableContainer = document.getElementById("tableContainer");

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
                data = await NASCAR.getCurrentWeekend();
                renderWeekend(data);
                break;

            case "nascar-racelist":
                data = await NASCAR.getTimeline();
                renderRaceTimeline(
                    data,
                    raceInfo,
                    tableContainer
                );
                break;

        }

    } catch (error) {

        console.error(error);

        output.textContent = `ERROR
${error.message}`;

    }

});

function renderRace(data) {

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

    tableContainer.innerHTML = html;

}

function renderWeekend(data) {

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

    tableContainer.innerHTML = html;

}
