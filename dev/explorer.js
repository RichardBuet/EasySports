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
                break;

            default:
                output.textContent = "Endpoint no válido";
                return;

        }

        output.textContent = JSON.stringify(data, null, 2);

    } catch (error) {

        console.error(error);

        output.textContent = `ERROR

${error.message}`;

    }

});
