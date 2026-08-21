const fs = require("fs");

const API_KEY = process.env.BLACKTOP_API_KEY;

if (!API_KEY) {
    throw new Error("Falta BLACKTOP_API_KEY");
}

const API_URL =
    "https://api.ocblacktop.com/v1/formula1/events";

async function main() {

    console.log("🏎️ Consultando Blacktop API...");

    const response = await fetch(API_URL, {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Blacktop API respondió ${response.status}: ${errorText}`
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
    console.error("❌ Error:", error.message);
    process.exit(1);
});
