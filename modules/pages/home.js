import { createHeader } from "../core/header.js";
import { createNavbar } from "../core/navbar.js";
import { createFooter } from "../core/footer.js";

export function renderHome() {
    return `
        ${createHeader()}
        ${createNavbar()}

        <main class="container">
            <h1>Bienvenido a EasySports</h1>
            <p>La plataforma deportiva está en construcción.</p>
        </main>

        ${createFooter()}
    `;
}
