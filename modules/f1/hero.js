import { F1 } from "../../services/siteF1.js";
import { openF1Modal } from "./F1Modals.js";

function formatDateOnly(dateString) {
    if (!dateString) {
        return null;
    }

    const [year, month, day] =
        dateString.split("-").map(Number);

    const date =
        new Date(year, month - 1, day);

    return {
        day: date.getDate(),
        month: date
            .toLocaleDateString("es-AR", {
                month: "short"
            })
            .toUpperCase(),
        year: date.getFullYear()
    };
}

function formatWeekend(event, race) {
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

    if (
        startDate.day === endDate.day &&
        startDate.month === endDate.month &&
        startDate.year === endDate.year
    ) {
        return `${endDate.day} ${endDate.month} ${endDate.year}`;
    }

    return `${startDate.day}–${endDate.day} ${endDate.month} ${endDate.year}`;
}

function formatSessionDate(dateTime) {
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
            weekday: "short",
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }
    )
        .format(date)
        .replace(",", " ·");
}

function getSessionLabel(session) {
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

function startNextSessionCountdown() {
    const countdown =
        document.querySelector(
            "[data-f1-countdown]"
        );

    if (!countdown) {
        return;
    }

    const target =
        Number(
            countdown.dataset.f1Countdown
        );

    if (!target) {
        return;
    }

    function updateCountdown() {
        const remaining =
            target - Date.now();

        if (remaining <= 0) {
            countdown.textContent =
                "EN CURSO";
            countdown.classList.add(
                "is-live"
            );
            return;
        }

        const totalSeconds =
            Math.floor(
                remaining / 1000
            );

        const days =
            Math.floor(
                totalSeconds / 86400
            );

        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );

        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );

        const seconds =
            totalSeconds % 60;

        countdown.textContent =
            `${days} días ${String(hours).padStart(2, "0")} h ${String(minutes).padStart(2, "0")} min ${String(seconds).padStart(2, "0")} s`;
    }

    updateCountdown();

    const interval =
        setInterval(
            updateCountdown,
            1000
        );

    countdown.dataset.interval =
        interval;
}

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

    const meta = [
        {
            icon: "",
            value:
                `Ronda ${race?.round ?? "—"}`
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

    const sessionInfo = [];

    if (currentSession) {
        sessionInfo.push({
            icon: "▶️",
            label: "Sesión actual",
            value:
                getSessionLabel(
                    currentSession
                )
        });
    }

    if (nextSession) {
        sessionInfo.push({
            icon: "⏭️",
            label: "Próxima sesión",
            value:
                `${getSessionLabel(nextSession)} · ${formatSessionDate(nextSession.startTime)}`,
            countdown:
                new Date(
                    nextSession.startTime
                ).getTime()
        });
    }

    const weekendButton = `
        <button
            type="button"
            class="hero__action"
            data-f1-weekend
        >
            🏁 Ver fin de semana
        </button>
    `;

    const html = `
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

                                                ${
                                                    session.countdown
                                                        ? `
                                                            <span
                                                                class="hero__countdown"
                                                                data-f1-countdown="${session.countdown}"
                                                            >
                                                                Calculando...
                                                            </span>
                                                        `
                                                        : ""
                                                }

                                            </div>

                                        </div>
                                    `).join("")}

                                </div>
                            `
                            : ""
                    }

                    ${weekendButton}

                </div>

            </div>

        </section>
    `;

    requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        startNextSessionCountdown();
    });
});

    return html;
}

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-f1-weekend]"
            );

        if (!button) {
            return;
        }

        F1.getHeroState()
            .then(heroData => {

                if (!heroData?.race) {
                    return;
                }

                openF1Modal(
                    "weekend",
                    heroData.race
                );
            })
            .catch(error => {

                console.error(
                    "Error abriendo fin de semana:",
                    error
                );

            });
    }
);
