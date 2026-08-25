import { F1 } from "../../services/siteF1.js";
export async function createRaceCenter() {
    const id = "f1-race-center";
    const html = `
        <section class="raceCenter" id="${id}">
            <div class="raceCenter-loading">Cargando Race Center...</div>
        </section>
    `;
    setTimeout(() => initRaceCenter(id), 0);
    return html;
}
async function initRaceCenter(id) {
    const container = document.getElementById(id);
    if (!container) return;
    const years = [2024, 2025, 2026];
    container.innerHTML = `
        <h2>🏁 Race Center</h2>
        <div class="raceCenter-years">
            ${years.map(year => `
                <button
                    type="button"
                    data-season="${year}"
                    class="${year === 2026 ? "active" : ""}"
                >
                    ${year}
                </button>
            `).join("")}
        </div>
        <div class="raceCenter-table-wrap">
            <div class="raceCenter-table-container">
                Cargando 2026...
            </div>
        </div>
    `;
    const buttons =
        container.querySelectorAll("[data-season]");
    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            const season =
                Number(button.dataset.season);
            buttons.forEach(btn =>
                btn.classList.remove("active")
            );
            button.classList.add("active");
            const tableContainer =
                container.querySelector(
                    ".raceCenter-table-container"
                );
            tableContainer.innerHTML =
                `Cargando ${season}...`;
            try {
                await renderSeason(
                    season,
                    tableContainer
                );
            } catch (error) {
                console.error(
                    `Error cargando temporada ${season}:`,
                    error
                );
                tableContainer.innerHTML =
                    `Error cargando ${season}`;
            }
        });
    });
    await renderSeason(
        2026,
        container.querySelector(
            ".raceCenter-table-container"
        )
    );
}
async function renderSeason(
    season,
    container
) {
    const schedule =
        await F1.getSchedule(season);
    const races =
        schedule.filter(race => race.round);
    const completedRaces = [];
    for (const race of races) {
        try {
            const results =
                await F1.getResults(
                    season,
                    race.round
                );
            if (
                Array.isArray(results) &&
                results.length
            ) {
                completedRaces.push({
                    race,
                    results
                });
            }
        } catch (error) {
            console.warn(
                `Sin resultados ${season} R${race.round}`,
                error
            );
        }
    }
    const drivers = new Map();
    for (const item of completedRaces) {
        const race =
            item.race;
        item.results.forEach(result => {
            const id =
                result.driver.id;
            if (!drivers.has(id)) {
                drivers.set(id, {
                    id,
                    code:
                        result.driver.code ??
                        result.driver.fullName
                            .split(" ")
                            .map(word => word[0])
                            .join("")
                            .toUpperCase(),
                    name:
                        result.driver.fullName,
                    points: 0,
                    races: {}
                });
            }
            const driver =
                drivers.get(id);
            driver.races[race.round] =
                result.position;
            driver.points +=
                Number(result.points) || 0;
        });
    }
    const driverList =
        [...drivers.values()]
            .sort((a, b) =>
                b.points - a.points
            );
    container.innerHTML = `
        <table class="raceCenter-table">
            <thead>
                <tr>
                    <th class="sticky-driver">
                        PILOTO
                    </th>
                    ${races.map(race => `
                        <th>
                            <strong>
                                R${race.round}
                            </strong>
                            <small>
                                ${race.raceName
                                    .replace(
                                        " Grand Prix",
                                        ""
                                    )}
                            </small>
                        </th>
                    `).join("")}
                    <th class="sticky-points">
                        PTS
                    </th>
                </tr>
            </thead>
            <tbody>
                ${driverList.map(driver => `
                    <tr>
                        <td class="sticky-driver">
                            <strong>
                                ${driver.code}
                            </strong>
                            <small>
                                ${driver.name}
                            </small>
                        </td>
                        ${races.map(race => {
                            const position =
                                driver.races[
                                    race.round
                                ];
                            return `
                                <td>
                                    ${
                                        position ??
                                        "—"
                                    }
                                </td>
                            `;
                        }).join("")}
                        <td class="sticky-points">
                            ${driver.points}
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}
