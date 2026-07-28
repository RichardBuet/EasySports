import { createHeader } from "./header.js";
import { createNavbar } from "./navbar.js";
import { createFooter } from "./footer.js";

    // return `
    //     ${createHeader()}
    //     ${createNavbar()}
    //     <main>

export function createLayout(content){
    return `
        <div class="headBar">
            ${createHeader()}
            ${createNavbar()}
        </div>
        <main>
            ${content}
        </main>
        ${createFooter()}
    `;
}
