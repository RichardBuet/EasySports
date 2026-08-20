export function createCard(title, description, link = "#", image = null) {
    return `
        <article class="card"${image ? ` style="--card-bg: url('${image}')"` : ""}>
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${link}" class="button">Ver más</a>
        </article>
    `;
}
