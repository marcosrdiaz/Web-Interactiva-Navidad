document.addEventListener("DOMContentLoaded", () => {
    const playlist = document.getElementById("playlist");
    const audio = document.getElementById("audio");

    playlist.addEventListener("click", (e) => {
        if (e.target && e.target.tagName === "LI") {
            const src = e.target.getAttribute("data-src");

            // Si el archivo seleccionado ya está cargado, no hacemos nada
            if (audio.src !== src) {
                // Detener la reproducción si ya se está reproduciendo algo
                audio.pause();

                // Cambiar la fuente de audio
                audio.src = src;

                // Reproducir el nuevo audio
                audio.load();
                audio.play();
            }
        }
    });
});
