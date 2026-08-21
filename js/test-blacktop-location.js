const API_KEY = process.env.BLACKTOP_API_KEY;

const LOCATION_ID = "c838f6ac-ccc4-40f0-9b7f-55b75dcdd8cd";

async function testLocation() {
    console.log("🏁 Consultando información del circuito...");

    const url = `https://api.ocblacktop.com/v1/formula1/locations/${LOCATION_ID}`;

    const response = await fetch(url, {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json"
        }
    });

    console.log("HTTP:", response.status);

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));
}

testLocation().catch(error => {
    console.error("❌ Error:", error);
    process.exit(1);
});
