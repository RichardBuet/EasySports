// =====================================
// EasySports API Service
// =====================================

export async function getJSON(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${url}`);
        }

        return await response.json();

    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
