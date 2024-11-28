document.addEventListener("DOMContentLoaded", () => {
    const playlist = document.getElementById("playlist");
    const audio = document.getElementById("audio");
    const audioSource = document.getElementById("audioSource");

    playlist.addEventListener("click", (e) => {
        if (e.target && e.target.nodeName === "LI") {
            const src = e.target.getAttribute("data-src");
            audioSource.src = src;
            audio.load();
            audio.play();
        }
    });
});