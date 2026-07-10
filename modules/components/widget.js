export function createWidget(title, content, link = "") {

    return `

        <section class="widget">

            <div class="widget-header">

                <h2>${title}</h2>

                ${
                    link
                        ? `<a href="${link}" class="widget-link">Ver más</a>`
                        : ""
                }

            </div>

            <div class="widget-content">

                ${content}

            </div>

        </section>

    `;

}
