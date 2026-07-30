import { F1 } from "../../services/siteF1.js";

export async function createHero() {

    const schedule = await F1.getSchedule();
    const standings = await F1.getStandings();
    const constructors = await F1.getConstructorStandings();

    const nextRace = schedule[0];
    const driverLeader = standings[0];
    const constructorLeader = constructors[0];

    return `
        <section class="hero hero--f1">

            <div class="hero__content">
              <div class="f1HeroOverlay"></div>
                <span class="hero__category">
                    Formula 1
                </span>

                <h1 class="hero__title">
                    ${nextRace.raceName}
                </h1>

                <p class="hero__subtitle">
                    ${nextRace.circuit.name}
                </p>

                <div class="hero__meta">
                    Round ${nextRace.round} • ${nextRace.date}
                </div>

                <div class="hero__leaders">

                    <div class="hero__leader">
                        👤 Driver Leader
                        <strong>${driverLeader.driver.fullName}</strong>
                    </div>

                    <div class="hero__leader">
                        🏆 Team Leader
                        <strong>${constructorLeader.constructor.name}</strong>
                    </div>

                </div>

            </div>

        </section>
    `;

}
