import { F1 } from "../../services/siteF1.js";

function formatWeekend(startDate, endDate) {

    const start = new Date(startDate);
    const end = new Date(endDate);

    const month = end.toLocaleDateString("es-AR", {
        month: "short"
    }).toUpperCase();

    return `${start.getDate()}–${end.getDate()} ${month} ${end.getFullYear()}`;

}

export async function createHero() {

    const [schedule, standings, constructors] = await Promise.all([
        F1.getSchedule(),
        F1.getStandings(),
        F1.getConstructorStandings()
    ]);

    console.log(schedule);
    console.log(schedule[0]);
    
    const nextRace = schedule[0];
    const driverLeader = standings[0];
    const constructorLeader = constructors[0];

    const eventDate = new Date(nextRace.date);

    const dateText = eventDate.toLocaleDateString("es-AR", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).toUpperCase();

    
    const hero = {

        state: "NEXT",

        category: "🏎 Formula 1",

        title: nextRace.raceName,

        subtitle: nextRace.circuit.name,

        meta: [
    
            {
                icon: "📍",
                value: `Round ${nextRace.round}`
            },
    
            {
                icon: "📅",
                value: formatWeekend(nextRace.firstPractice, nextRace.date)
            },
    
            {
                icon: "🏁",
                value: `${nextRace.laps ?? "—"} vueltas`
            }
    
        ],


        leaders: [

            {
                icon: "👤",
                label: "Driver Leader",
                value: driverLeader.driver.fullName
            },

            {
                icon: "🏆",
                label: "Team Leader",
                value: constructorLeader.constructor.name
            }

        ]

    };

    switch (hero.state) {

        case "NEXT":
            hero.category = "🟢 Formula 1 · Próximo Gran Premio";
            break;

        case "LIVE":
            hero.category = "🔴 Formula 1 · En Vivo";
            break;

        case "QUALIFYING":
            hero.category = "⚡ Formula 1 · Qualifying";
            break;

        case "SPRINT":
            hero.category = "🏁 Formula 1 · Sprint";
            break;

        case "FINISHED":
            hero.category = "🏆 Formula 1 · Gran Premio Finalizado";
            break;

    }

    return `
        <section class="hero hero--f1">

            <div class="hero__content">

                <div class="f1HeroOverlay"></div>

                <span class="hero__category">
                    ${hero.category}
                </span>

                <h1 class="hero__title">
                    ${hero.title}
                </h1>

                <p class="hero__subtitle">
                    ${hero.subtitle}
                </p>

                <div class="hero__meta">

                    ${hero.meta.map(item => `
                        <div class="hero__meta-item">
                            <span>${item.icon}</span>
                            <strong>${item.value}</strong>
                        </div>
                    `).join("")}

                </div>

                <div class="hero__leaders">

                    ${hero.leaders.map(item => `
                        <div class="hero__leader">
                            ${item.icon} ${item.label}
                            <strong>${item.value}</strong>
                        </div>
                    `).join("")}

                </div>

            </div>

        </section>
    `;

}
