document.addEventListener("DOMContentLoaded", () => {
    const playlist = document.getElementById("playlist");
    const audio = document.getElementById("audio");

    playlist.addEventListener("click", (e) => {
        if (e.target && e.target.tagName === "LI") {
            const src = e.target.getAttribute("data-src");

            // Detener la reproducción si ya se está reproduciendo algo
            audio.pause();

            // Limpia las fuentes antiguas
            audio.innerHTML = '';

            // Crea una nueva fuente
            const source = document.createElement("source");
            source.src = src;
            source.type = "audio/mpeg";

            // Agrega la nueva fuente al audio
            audio.appendChild(source);
            audio.load();

            // Espera a que se pueda reproducir antes de llamar a play()
            audio.addEventListener("canplay", () => {
                audio.play();
            }, { once: true });  // Se asegura de que se ejecute solo una vez
        }
    });
});
