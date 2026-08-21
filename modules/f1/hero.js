import { F1 } from "../../services/siteF1.js";


function formatWeekend(race) {

    const start =
        race.firstPractice?.date ??
        race.sprintQualifying?.date ??
        race.qualifying?.date ??
        race.date;


    const end =
        race.date;


    if (!start || !end) {
        return "—";
    }


    const startDate =
        new Date(start);


    const endDate =
        new Date(end);


    const month =
        endDate.toLocaleDateString(
            "es-AR",
            {
                month: "short"
            }
        ).toUpperCase();


    if (
        startDate.getDate() ===
        endDate.getDate()
    ) {

        return `${endDate.getDate()} ${month} ${endDate.getFullYear()}`;

    }


    return `${startDate.getDate()}–${endDate.getDate()} ${month} ${endDate.getFullYear()}`;

}


function getCategory(state) {

    switch (state) {

        case "LIVE":

            return "🔴 Formula 1 · EN VIVO";


        case "FINISHED":

            return "🏆 Formula 1 · GRAN PREMIO FINALIZADO";


        case "NEXT":
        default:

            return "🟢 Formula 1 · PRÓXIMO GRAN PREMIO";

    }

}


export async function createHero() {

    const heroData =
        await F1.getHeroState();


    const race =
        heroData.race;


    const category =
        getCategory(heroData.state);


    const meta = [

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

    ];


    return `

        <section class="hero hero--f1">

            <div class="f1HeroOverlay"></div>


            <div class="hero__content">

                <span class="hero__category">

                    ${category}

                </span>


                <h1 class="hero__title">

                    ${heroData.title}

                </h1>


                <p class="hero__subtitle">

                    ${heroData.subtitle}

                </p>


                <div class="hero__info">

                    <div class="hero__meta">

                        ${meta.map(item => `

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

                </div>

            </div>

        </section>

    `;

}
