let overlay = null;

export function openModal({ title = "", content = "" }) {

    closeModal();

    overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    overlay.innerHTML = `
        <div class="modal">

            <div class="modal-header">

                <h2>${title}</h2>

                <button class="modal-close">&times;</button>

            </div>

            <div class="modal-body">

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

    overlay.querySelector(".modal-close")
        .addEventListener("click", closeModal);

}

export function closeModal() {

    if (overlay) {

        overlay.remove();

        overlay = null;

    }

}
