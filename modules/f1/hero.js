import { F1 } from "../../services/siteF1.js";


function formatWeekend(race) {

    const start =
        race.firstPractice?.date ??
        race.sprintQualifying?.date ??
        race.qualifying?.date ??
        race.date;

    const end =
        race.date;

    const startDate =
        new Date(start);

    const endDate =
        new Date(end);

    const month =
        endDate
            .toLocaleDateString(
                "es-AR",
                {
                    month: "short"
                }
            )
            .toUpperCase();


    if (
        startDate.getDate() ===
        endDate.getDate()
    ) {

        return `${endDate.getDate()} ${month} ${endDate.getFullYear()}`;

    }


    return `${startDate.getDate()}–${endDate.getDate()} ${month} ${endDate.getFullYear()}`;

}


export async function createHero() {

    const heroData =
        await F1.getHeroState();


    const race =
        heroData.race;


    const driverLeader =
        heroData.leaders.driver;


    const constructorLeader =
        heroData.leaders.constructor;


    let category =
        "🟢 Formula 1 · Próximo Gran Premio";


    switch (heroData.state) {

        case "LIVE":

            category =
                "🔴 Formula 1 · EN VIVO";

            break;


        case "NEXT":

            category =
                "🟢 Formula 1 · PRÓXIMO GRAN PREMIO";

            break;


        case "FINISHED":

            category =
                "🏆 Formula 1 · GRAN PREMIO FINALIZADO";

            break;

    }


    const hero = {

        state:
            heroData.state,

        category,

        title:
            heroData.title,

        subtitle:
            heroData.subtitle,

        meta: [

            {
                icon: "📍",
                value:
                    `Round ${race.round ?? "—"}`
            },

            {
                icon: "📅",
                value:
                    formatWeekend(race)
            },

            {
                icon: "🏁",
                value:
                    `${race.laps ?? "—"} vueltas`
            }

        ],

        leaders: [

            {
                icon: "👤",
                label:
                    "Driver Leader",

                value:
                    driverLeader?.driver?.fullName ??
                    "—"
            },

            {
                icon: "🏆",
                label:
                    "Team Leader",

                value:
                    constructorLeader?.constructor?.name ??
                    "—"
            }

        ]

    };


    return `

        <section class="hero hero--f1">

            <div class="f1HeroOverlay"></div>

            <div class="hero__content">

                <span class="hero__category">

                    ${hero.category}

                </span>


                <h1 class="hero__title">

                    ${hero.title}

                </h1>


                <p class="hero__subtitle">

                    ${hero.subtitle}

                </p>


                <div class="hero__info">

                    <div class="hero__meta">

                        ${hero.meta.map(item => `

                            <div class="hero__meta-item">

                                <span>
                                    ${item.icon}
                                </span>

                                <strong>
                                    ${item.value}
                                </strong>

                            </div>

                        `).join("")}

                    </div>


                    <div class="hero__championship">

                        <span class="hero__championship-title">

                            🏆 Puntero del campeonato:

                        </span>


                        <div class="hero__championship-driver-driver">

                            <strong>

                                ${driverLeader?.driver?.fullName ?? "—"}

                            </strong>


                            <span class="hero__championship-team">

                                ${constructorLeader?.constructor?.name ?? "—"}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    `;

}
