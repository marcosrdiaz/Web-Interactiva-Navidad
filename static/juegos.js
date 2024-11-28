// Seleccionamos todos los elementos con la clase "game"
const games = document.querySelectorAll('.game');

// Añadimos un evento de clic a cada juego
games.forEach(game => {
    game.addEventListener('click', () => {
        const selectedGame = game.getAttribute('data-game');
        cambiarPantallaJuego(selectedGame);
    });
});

// Función para cambiar a la pantalla del juego seleccionado
function cambiarPantallaJuego(juego) {
    // Aquí puedes redirigir a otra página o cargar el juego dinámicamente
    // Por ejemplo, redirigir a una página específica:
    window.location.href = `${juego}.html`;

    // Si prefieres cargar contenido dinámico, puedes usar fetch() para cargar el juego en el mismo sitio
}
 