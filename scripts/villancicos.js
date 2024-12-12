document.addEventListener("DOMContentLoaded", () => {
    const playlist = document.getElementById("playlist");
    const audio = document.getElementById("audio");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let currentIndex = 0;
    const items = playlist.querySelectorAll("li");

    // Función para actualizar la canción activa
    const updateActiveSong = (index) => {
        items.forEach((item) => item.classList.remove("active"));
        items[index].classList.add("active");
        const src = items[index].getAttribute("data-src");
        audio.src = src;
        // Reproducir solo si el usuario ha interactuado con la página
        if (audio.paused) {
            audio.play().catch(error => {
                console.log("El usuario necesita interactuar con la página primero.");
            });
        }
    };

    // Evento de clic en elementos de la lista
    playlist.addEventListener("click", (e) => {
        if (e.target && e.target.tagName === "LI") {
            currentIndex = Array.from(items).indexOf(e.target);
            updateActiveSong(currentIndex);
        }
    });

    // Botón Anterior
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateActiveSong(currentIndex);
    });

    // Botón Siguiente
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateActiveSong(currentIndex);
    });

    // Reproducir la siguiente canción cuando termine la actual
    audio.addEventListener("ended", () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateActiveSong(currentIndex);
    });
});
