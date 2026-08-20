/* MODALS F1 ALL INCLUSIVE */


let modalStack = [];

function createModal(content) {
    return `
        <div class="f1-modal-overlay">
            <div class="f1-modal">
                <button class="f1-modal-close" type="button">×</button>
                <div class="f1-modal-content">
                    ${content}
                </div>
            </div>
        </div>
    `;
}

function renderModal(content) {
    const existing = document.querySelector(".f1-modal-overlay");

    if (existing) {
        existing.remove();
    }

    document.body.insertAdjacentHTML(
        "beforeend",
        createModal(content)
    );

    requestAnimationFrame(() => {
        document
            .querySelector(".f1-modal-overlay")
            ?.classList.add("show");
    });

    initModalEvents();
}

function initModalEvents() {
    const overlay = document.querySelector(".f1-modal-overlay");
    const close = document.querySelector(".f1-modal-close");

    if (!overlay || !close) return;

    close.addEventListener("click", closeF1Modal);

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeF1Modal();
        }
    });
}

export function openF1Modal(type, data = null) {
    modalStack.push({
        type,
        data
    });

    renderModal(`
        <h2>F1 Modal</h2>
        <p>${type}</p>
    `);
}

export function closeF1Modal() {
    const overlay = document.querySelector(".f1-modal-overlay");

    if (!overlay) return;

    overlay.classList.remove("show");

    setTimeout(() => {
        overlay.remove();
        modalStack.pop();
    }, 200);
}

export function backF1Modal() {
    if (modalStack.length <= 1) {
        closeF1Modal();
        return;
    }

    modalStack.pop();

    const previous = modalStack[modalStack.length - 1];

    renderModal(`
        <h2>F1 Modal</h2>
        <p>${previous.type}</p>
    `);
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeF1Modal();
    }
});
