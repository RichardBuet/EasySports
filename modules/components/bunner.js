export function createBunner() {
    return `
        <section class="bunner">
            <picture>
                <source
                    media="(orientation: portrait)"
                    srcset="assets/images/EasySports-backmovil.png"
                >
                <img
                    src="assets/images/Bunner-EasySports.png"
                    alt="EasySports Banner"
                    class="hero-bunner"
                >
            </picture>
        </section>
    `;
}
