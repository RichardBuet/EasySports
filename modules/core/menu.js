export function initSportsMenu() {

    const button = document.getElementById("sportsMenu");
    const menu = document.getElementById("sportsMenuPanel");

    if (!button || !menu) return;

    button.addEventListener("click", (event) => {

        event.stopPropagation();

        menu.classList.toggle("show");

    });

    menu.addEventListener("click", (event) => {

        event.stopPropagation();

    });

    document.addEventListener("click", () => {

        menu.classList.remove("show");

    });

}
