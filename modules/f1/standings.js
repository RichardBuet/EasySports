export async function createStandings() {

    const standings = await F1.getStandings();

    return `
        <section>
            <h2>Driver Standings</h2>
        </section>
    `;

}
