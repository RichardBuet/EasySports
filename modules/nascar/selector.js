export function createNascarSelector(){
    return `
        <section class="container">
            <div id="nascar-selector" class="nascar-selector">
                <button class="active" data-series="1">🏁 Cup</button>
                <button data-series="2">🟢 O'Reilly</button>
                <button data-series="3">🚛 Truck</button>
            </div>
        </section>
    `;
}
