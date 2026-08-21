const fs = require("fs");

const API_KEY = process.env.BLACKTOP_API_KEY;

if (!API_KEY) {
    throw new Error("Falta BLACKTOP_API_KEY");
}

const API_URL =
    "https://api.ocblacktop.com/v1/formula1/events";

async function consultarBlacktop() {

    const response = await fetch(API_URL, {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `HTTP ${response.status}: ${errorText}`
        );
    }

    return await response.json();
}


async function main() {

    console.log("🏎️ Consultando Blacktop API...");

    let data = null;
    let ultimoError = null;

    for (let intento = 1; intento <= 3; intento++) {

        try {

            console.log(`🔄 Intento ${intento}/3...`);

            data = await consultarBlacktop();

            console.log("✅ Datos recibidos");

            break;

        } catch (error) {

            ultimoError = error;

            console.log(
                `⚠️ Intento ${intento} falló: ${error.message}`
            );

            if (intento < 3) {
                console.log("⏳ Esperando 3 segundos...");
                await new Promise(
                    resolve => setTimeout(resolve, 3000)
                );
            }
        }
    }

    if (!data) {

        console.error("❌ No fue posible consultar Blacktop.");

        console.error(
            "Último error:",
            ultimoError?.message
        );

        process.exit(1);
    }


    fs.mkdirSync("data", {
        recursive: true
    });


    fs.writeFileSync(
        "data/f1-blacktop.json",
        JSON.stringify(data, null, 2)
    );


    console.log(
        "💾 Guardado: data/f1-blacktop.json"
    );

    console.log(
        `📊 Eventos recibidos: ${data.data?.length ?? "?"}`
    );
}


main().catch(error => {

    console.error(
        "❌ Error inesperado:",
        error.message
    );

    process.exit(1);
});
