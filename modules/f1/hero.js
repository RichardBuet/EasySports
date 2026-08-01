import { F1 } from "../../services/siteF1.js";

function formatWeekend(race) {
    const start =
        race.firstPractice?.date ??
        race.sprintQualifying?.date ??
        race.qualifying?.date ??
        race.date;
    const end = race.date;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const month = endDate.toLocaleDateString("es-AR", {
        month: "short"
    }).toUpperCase();
    if (startDate.getDate() === endDate.getDate()) {
        return `${endDate.getDate()} ${month} ${endDate.getFullYear()}`;
    }
    return `${startDate.getDate()}–${endDate.getDate()} ${month} ${endDate.getFullYear()}`;
}

export async function createHero() {
    const heroData = await F1.getHeroState();
    const nextRace = heroData.race;
    const driverLeader = heroData.leaders.driver;
    const constructorLeader = heroData.leaders.constructor;
    const hero = {
        state: heroData.state,
        category: heroData.category,
        title: nextRace.raceName,
        subtitle: nextRace.circuit.name,
        meta: [
            {
                icon: "📍",
                value: `Round ${nextRace.round}`
            },
    
            {
                icon: "📅",
                value: formatWeekend(nextRace)
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
            <div class="f1HeroOverlay"></div>
            <div class="hero__content">
                <span class="hero__category">
                            ${hero.category}
                        </span>
                <h1 class="hero__title">${hero.title}</h1>
                <p class="hero__subtitle">${hero.subtitle}</p>
                <div class="hero__info">
                    <div class="hero__meta">
                        ${hero.meta.map(item => `
                            <div class="hero__meta-item">
                                <span>${item.icon}</span>
                                <strong>${item.value}</strong>
                            </div>
                        `).join("")}
                    </div>
                    <div class="hero__championship">
                        <span class="hero__championship-title"> 🏆 Puntero del campeonato</span>
                        <div  class="hero__championship-driver-driver">
                        <strong> ${driverLeader.driver.fullName}</strong>
                        <span class="hero__championship-team">${constructorLeader.constructor.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        
        </section>
    `;

}
