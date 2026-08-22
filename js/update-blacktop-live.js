const fs = require("fs");

const API_KEY = process.env.BLACKTOP_API_KEY;

if (!API_KEY) {
    throw new Error("Falta BLACKTOP_API_KEY");
}


const EVENTS_FILE =
    "data/f1-blacktop.json";


const OUTPUT_FILE =
    "data/f1-blacktop-live.json";


const BASE_URL =
    "https://api.ocblacktop.com/v1/formula1/live/sessions";


/* =========================================================
   LEER EVENTOS ACTUALES
========================================================= */

function cargarEventos() {

    if (!fs.existsSync(EVENTS_FILE)) {

        throw new Error(
            `No existe ${EVENTS_FILE}`
        );

    }


    const data =
        JSON.parse(
            fs.readFileSync(
                EVENTS_FILE,
                "utf8"
            )
        );


    return data?.data ?? [];

}


/* =========================================================
   BUSCAR SESIÓN EN VIVO
========================================================= */

function buscarSesionLive(events) {

    for (const event of events) {

        const sessions =
            event.schedule ??
            event.sessions ??
            [];


        const liveSession =
            sessions.find(
                session =>
                    session.status === "ongoing"
            );


        if (liveSession) {

            return {
                event,
                session: liveSession
            };

        }

    }


    return null;

}


/* =========================================================
   CONSULTAR LIVE TIMING
========================================================= */

async function consultarLiveTiming(
    sessionId
) {

    const url =
        `${BASE_URL}/${sessionId}/timing`;


    console.log(
        "🏎️ Consultando:",
        url
    );


    const response =
        await fetch(
            url,
            {
                headers: {
                    "x-api-key":
                        API_KEY,
                    "Content-Type":
                        "application/json"
                }
            }
        );


    if (!response.ok) {

        const errorText =
            await response.text();


        throw new Error(
            `HTTP ${response.status}: ${errorText}`
        );

    }


    return await response.json();

}


/* =========================================================
   MAIN
========================================================= */

async function main() {

    console.log(
        "🏎️ Blacktop F1 LIVE"
    );


    const events =
        cargarEventos();


    const live =
        buscarSesionLive(
            events
        );


    /*
     * No hay sesión en vivo.
     * NO hacemos ninguna petición.
     */

    if (!live) {

        console.log(
            "ℹ️ No hay sesión F1 en vivo."
        );

        return;

    }


    const sessionId =
        live.session.id;


    console.log(
        "🔴 Sesión en vivo:",
        live.session.name
    );


    console.log(
        "🆔 Session ID:",
        sessionId
    );


    const data =
        await consultarLiveTiming(
            sessionId
        );


    fs.mkdirSync(
        "data",
        {
            recursive: true
        }
    );


    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(
            data,
            null,
            2
        )
    );


    console.log(
        `💾 Guardado: ${OUTPUT_FILE}`
    );

}


main().catch(
    error => {

        console.error(
            "❌ Error:",
            error.message
        );

        process.exit(1);

    }
);
