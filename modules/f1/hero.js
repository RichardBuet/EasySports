import { F1 } from "../../services/siteF1.js";
    
/*
 * =====================================================
 * FORMATO DE FECHA DEL FIN DE SEMANA
 * =====================================================
 *
 * Las fechas YYYY-MM-DD NO se convierten mediante
 * new Date(), porque eso puede desplazarlas un día
 * en Argentina por diferencia horaria.
 */
function formatDateOnly(dateString) {
    if (!dateString) {
        return null;
    }
    const [
        year,
        month,
        day
    ] =
        dateString
            .split("-")
            .map(Number);
    const date =
        new Date(
            year,
            month - 1,
            day
        );
    return {
        day:
            date.getDate(),
        month:
            date
                .toLocaleDateString(
                    "es-AR",
                    {
                        month: "short"
                    }
                )
                .toUpperCase(),
        year:
            date.getFullYear()
    };
}
function formatWeekend(
    event,
    race
) {
    const start =
        event?.dateStart ??
        race?.firstPractice?.date ??
        race?.sprintQualifying?.date ??
        race?.qualifying?.date ??
        race?.date;
    const end =
        event?.dateEnd ??
        race?.date;
    if (!start || !end) {
        return "—";
    }
    const startDate =
        formatDateOnly(start);
    const endDate =
        formatDateOnly(end);
    if (!startDate || !endDate) {
        return "—";
    }
    /*
     * Mismo día
     */
    if (
        startDate.day === endDate.day &&
        startDate.month === endDate.month &&
        startDate.year === endDate.year
    ) {
        return `${endDate.day} ${endDate.month} ${endDate.year}`;
    }
    /*
     * Rango
     */
    return `${startDate.day}–${endDate.day} ${endDate.month} ${endDate.year}`;
}
/*
 * =====================================================
 * HORA ARGENTINA
 * =====================================================
 */
function formatSessionDate(
    dateTime
) {
    if (!dateTime) {
        return "—";
    }
    const date =
        new Date(dateTime);
    return new Intl.DateTimeFormat(
        "es-AR",
        {
            timeZone:
                "America/Argentina/Buenos_Aires",
            weekday:
                "short",
            day:
                "2-digit",
            month:
                "short",
            hour:
                "2-digit",
            minute:
                "2-digit",
            hour12:
                false
        }
    )
        .format(date)
        .replace(",", " ·");
}
/*
 * =====================================================
 * NOMBRE DE SESIÓN
 * =====================================================
 */
function getSessionLabel(
    session
) {
    if (!session) {
        return null;
    }
    switch (session.type) {
        case "practice":
            return session.name;
        case "sprint_qualifying":
            return "Sprint Qualifying";
        case "sprint":
            return "Sprint";
        case "qualifying":
            return "Qualifying";
        case "race":
            return "Race";
        default:
            return session.name ?? "Sesión";
    }
}
/*
 * =====================================================
 * CATEGORÍA
 * =====================================================
 */
function getCategory(
    state
) {
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
/*
 * =====================================================
 * HERO
 * =====================================================
 */
export async function createHero() {
    const heroData =
        await F1.getHeroState();
    const race =
        heroData.race;
    const event =
        heroData.event;
    const category =
        getCategory(
            heroData.state
        );
    const currentSession =
        heroData.session?.current;
    const nextSession =
        heroData.session?.next;
    /*
     * =================================================
     * META
     * =================================================
     */
    const meta = [
        {
            icon: "📍",
            value:
                `Round ${race?.round ?? "—"}`
        },
        {
            icon: "📅",
            value:
                formatWeekend(
                    event,
                    race
                )
        }
    ];
    /*
     * =================================================
     * SESIONES
     * =================================================
     */
    const sessionInfo = [];
    if (currentSession) {
        sessionInfo.push({
            icon: "▶️",
            label:
                "Sesión actual",
            value:
                getSessionLabel(
                    currentSession
                )
        });
    }
    if (nextSession) {
        sessionInfo.push({
            icon: "⏭️",
            label:
                "Próxima sesión",
            value:
                `${getSessionLabel(nextSession)} · ${formatSessionDate(nextSession.startTime)}`
        });
    }
    /*
     * =================================================
     * HTML
     * =================================================
     */
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
                    ${
                        sessionInfo.length
                            ? `
                                <div class="hero__sessions">
                                    ${sessionInfo.map(session => `
                                        <div class="hero__session">
                                            <span>
                                                ${session.icon}
                                            </span>
                                            <div>
                                                <small>
                                                    ${session.label}
                                                </small>
                                                <strong>
                                                    ${session.value}
                                                </strong>
                                            </div>
                                        </div>
                                    `).join("")}
                                </div>
                            `
                            : ""
                    }
                </div>
            </div>
        </section>
    `;
}
