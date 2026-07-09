export function createF1Standings() {
    return `
        <section class="f1-standings">

            <div class="section-header">
                <h2>🏎 Fórmula 1</h2>
                <span>Clasificación del Campeonato</span>
            </div>

            <div id="f1StandingsList" class="standings-list">

                <div class="loading">
                    Cargando clasificación...
                </div>

            </div>

        </section>
    `;
}
