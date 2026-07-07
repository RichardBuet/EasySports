import { createHeader } from "../modules/core/header.js";
import { createNavbar } from "../modules/core/navbar.js";
import { createFooter } from "../modules/core/footer.js";

export function initRouter() {

    console.log("=================================");
    console.log(" EasySports iniciado");
    console.log("=================================");

    const app = document.getElementById("app");

    app.innerHTML = `
        ${createHeader()}
        ${createNavbar()}

        <main class="container">
            <h1>Bienvenido a EasySports</h1>
            <p>La plataforma deportiva está en construcción.</p>
        </main>

        ${createFooter()}
    `;
}
