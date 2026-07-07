export function createCard(title, description, link = "#") {
    return `
        <article class="card">
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${link}" class="button">Ver más</a>
        </article>
    `;
}
