const API_KEY = process.env.BLACKTOP_API_KEY;

const EVENT_ID = "45231ac5-926f-4e14-8f14-6888292f4a3b";

async function testEvent() {
    console.log("🏁 Consultando información del Dutch Grand Prix...");

    const url = `https://api.ocblacktop.com/v1/formula1/events/${EVENT_ID}`;

    const response = await fetch(url, {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json"
        }
    });

    console.log("HTTP:", response.status);

    const data = await response.json();

    if (!response.ok) {
        console.error("❌ Error:", JSON.stringify(data, null, 2));
        process.exit(1);
    }

    console.log(JSON.stringify(data, null, 2));
}

testEvent().catch(error => {
    console.error("❌ Error:", error);
    process.exit(1);
});
