// =========================================
// DETAILS PAGE - INTERACTIONS
// =========================================


// =========================================
// SHARE BUTTON
// =========================================

const shareButton = document.getElementById("shareButton");

if (shareButton) {
    shareButton.addEventListener("click", async () => {

        const shareData = {
            title: "Omega - Enrique Morente & Lagartija Nick",
            text: "Omega - Edición Definitiva",
            url: window.location.href
        };

        try {

            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Enlace copiado al portapapeles.");
            }

        } catch (error) {
            console.log("Compartir cancelado.");
        }

    });
}


// =========================================
// PDF BUTTON
// =========================================

const pdfButton = document.getElementById("pdfButton");

if (pdfButton) {

    pdfButton.addEventListener("click", () => {

        alert(
            "La ficha técnica PDF estará disponible próximamente."
        );

    });

}


// =========================================
// VINYL PLAY BUTTON
// =========================================

const playCoverButton = document.getElementById("playCoverButton");

if (playCoverButton) {

    let isPlaying = false;

    playCoverButton.addEventListener("click", () => {

        isPlaying = !isPlaying;

        playCoverButton.textContent = isPlaying
            ? "❚❚"
            : "▶";

        playCoverButton.setAttribute(
            "aria-label",
            isPlaying
                ? "Pausar reproducción"
                : "Reproducir"
        );

    });

}


// =========================================
// TRACK SELECTION
// =========================================

const trackButtons = document.querySelectorAll(".track-button");

trackButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const tracks = document.querySelectorAll(".track");

        tracks.forEach((track) => {
            track.classList.remove("active");
        });

        const selectedTrack = button.closest(".track");

        if (selectedTrack) {
            selectedTrack.classList.add("active");
        }

    });

});


// =========================================
// ADD BUTTONS
// =========================================

const addButtons = document.querySelectorAll(".add-button");

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const originalText = button.textContent;

        button.textContent = "Añadido ✓";
        button.disabled = true;

        setTimeout(() => {

            button.textContent = originalText;
            button.disabled = false;

        }, 1500);

    });

});