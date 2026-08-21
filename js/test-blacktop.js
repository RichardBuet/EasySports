const API_URL = "https://api.ocblacktop.com/v1/formula1/events";

async function main() {

    console.log("🏎️ Consultando Blacktop API...");

    const response = await fetch(API_URL, {
        headers: {
            "x-api-key": process.env.BLACKTOP_API_KEY,
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

    console.log("✅ Conexión exitosa con Blacktop");
    console.log(JSON.stringify(data, null, 2));
}

main().catch(error => {
    console.error("❌ Error:", error.message);
    process.exit(1);
});
