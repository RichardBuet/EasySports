export function createWidget(title, content, link = "") {
    return `
        <section class="dashboard-widget">

            <div class="widget-header">
                <h2>${title}</h2>
                ${link ? `<a href="${link}">Ver más →</a>` : ""}
            </div>

            <div class="widget-body">
                ${content}
            </div>

        </section>
    `;
}
