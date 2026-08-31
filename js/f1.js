import { renderF1 } from "../modules/pages/f1.js";
import { initSportsMenu } from "../modules/core/menu.js";
import { initF1DashboardModals } from "../modules/f1/dashboard.js";

const app = document.getElementById("app");

const F1_LOADING_VIDEO =
    new URL(
        "../assets/loading/video-output-156311E3-D766-4712-ABC5-54C8F56065D3-1.mp4",
        import.meta.url
    ).href;


/*
 * =====================================================
 * LOADING F1
 * =====================================================
 */

function renderF1Loading() {

    return `
        <div class="sport-loading sport-loading--f1">

            <video
                class="sport-loading__video"
                autoplay
                muted
                playsinline
                loop
                preload="auto"
            >
                <source
                    src="${F1_LOADING_VIDEO}"
                    type="video/mp4"
                >
            </video>

        </div>
    `;
}


/*
 * =====================================================
 * REFRESH F1
 * =====================================================
 */

export async function refreshF1() {

    /*
     * Mostramos el loading ANTES de comenzar
     * a esperar los datos.
     */
    app.innerHTML = renderF1Loading();

    try {

        /*
         * Mientras el video está visible,
         * F1 se carga en segundo plano.
         */
        const html = await renderF1();

        /*
         * Reemplazamos el loading por la página
         * completa una vez que terminó.
         */
        app.innerHTML = html;

        initSportsMenu();
        initF1DashboardModals();

    } catch (error) {

        console.error(
            "❌ Error cargando Fórmula 1:",
            error
        );

        app.innerHTML = `
            <div class="sport-loading-error">
                <h2>⚠️ No se pudo cargar Fórmula 1</h2>
                <p>Intentá nuevamente.</p>
            </div>
        `;
    }
}


/*
 * =====================================================
 * INICIO
 * =====================================================
 */

document.addEventListener(
    "DOMContentLoaded",
    async () => {
        await refreshF1();
    }
);
