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
        modalClass
            ? `modal-overlay ${modalClass}-overlay`
            : "modal-overlay";

    overlay.innerHTML = `

        <div class="${modalClass || "modal"}">

            <div class="${modalClass ? `${modalClass}-header` : "modal-header"}">

                <h2>${title}</h2>

                <button
                    class="${modalClass ? `${modalClass}-close` : "modal-close"}"
                    type="button">
                    &times;
                </button>

            </div>


            <div class="${modalClass ? `${modalClass}-body` : "modal-body"}">

                ${content}

            </div>

        </div>

    `;

    document.body.appendChild(overlay);


    overlay.addEventListener("click", (e) => {

        if (e.target === overlay) {

            closeModal();

        }

    });


    overlay
        .querySelector(
            `.${modalClass ? `${modalClass}-close` : "modal-close"}`
        )
        .addEventListener(
            "click",
            closeModal
        );

}


export function closeModal() {

    if (onClose) {

        onClose();

        onClose = null;

    }

    if (overlay) {

        overlay.remove();

        overlay = null;

    }

}
