let overlay = null;
let onClose = null;

export function openModal({
    title = "",
    content = "",
    modalClass = "",
    onClose: callback = null
}) {

    closeModal();

    onClose = callback;

    overlay = document.createElement("div");

    overlay.className =
        `modal-overlay ${modalClass}-overlay`.trim();

    overlay.innerHTML = `

        <div class="modal ${modalClass}">

            <div class="modal-header ${modalClass}-header">

                <h2>${title}</h2>

                <button
                    class="modal-close ${modalClass}-close"
                    type="button"
                    aria-label="Cerrar">
                    &times;
                </button>

            </div>

            <div class="modal-body ${modalClass}-body">

                ${content}

            </div>

        </div>

    `;

    document.body.appendChild(overlay);


    /* =========================================
       CERRAR AL HACER CLICK FUERA
       ========================================= */

    overlay.addEventListener("click", (e) => {

        if (e.target === overlay) {

            closeModal();

        }

    });


    /* =========================================
       CERRAR CON BOTÓN
       ========================================= */

    const closeButton =
        overlay.querySelector(
            ".modal-close"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }

}


export function closeModal() {

    if (onClose) {

        const callback = onClose;

        onClose = null;

        callback();

    }


    if (overlay) {

        overlay.remove();

        overlay = null;

    }

}
