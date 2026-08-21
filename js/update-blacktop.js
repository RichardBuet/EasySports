const fs = require("fs");

const API_KEY = process.env.BLACKTOP_API_KEY;

if (!API_KEY) {
    throw new Error("Falta BLACKTOP_API_KEY");
}

const URL =
    "https://api.blacktop.technology/v1/sports/formula-1/events";

async function main() {

    console.log("🏎️ Consultando Blacktop API...");

    const response = await fetch(URL, {
        headers: {
            "x-api-key": API_KEY
        }
    });

    if (!response.ok) {
        const text = await response.text();

        throw new Error(
            `Blacktop API respondió ${response.status}: ${text}`
        );
    }

    const data = await response.json();

    console.log("✅ Datos recibidos");

    fs.mkdirSync("data", {
        recursive: true
    });

    fs.writeFileSync(
        "data/f1-blacktop.json",
        JSON.stringify(data, null, 2)
    );

    console.log("💾 Guardado: data/f1-blacktop.json");
}

main().catch(error => {
    console.error("❌", error.message);
    process.exit(1);
});
