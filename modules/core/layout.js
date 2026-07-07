import { createHeader } from "./header.js";
import { createNavbar } from "./navbar.js";
import { createFooter } from "./footer.js";

export function createLayout(content){
    return `
        ${createHeader()}
        ${createNavbar()}
        <main>
            ${content}
        </main>
        ${createFooter()}
    `;
}
