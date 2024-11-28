document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-btn');
    const closeButtons = document.querySelectorAll('.close-btn');

    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const gameScreen = document.querySelector(targetId);

            if (gameScreen) {
                // Ocultar todas las pantallas de juegos
                document.querySelectorAll('.juego-oculto').forEach(screen => {
                    screen.classList.remove('juego-visible');
                    screen.style.display = 'none';
                });

                // Mostrar la pantalla del juego seleccionado
                gameScreen.style.display = 'block';
                gameScreen.classList.add('juego-visible');
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameScreen = this.parentElement;

            if (gameScreen) {
                gameScreen.style.display = 'none';
                gameScreen.classList.remove('juego-visible');
            }
        });
    });
});


// Botones para iniciar el juego
const playButtons = document.querySelectorAll('.play-btn');

// Añadir eventos a cada botón
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const targetSelector = button.getAttribute('data-target');
        const gameElement = document.querySelector(targetSelector);

        if (gameElement) {
            gameElement.style.display = 'flex';
            moverObjetivo(); // Mueve el objetivo cuando se abre el juego
        }
    });
});

// Lógica del juego
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
let score = 0;

function moverObjetivo() {
    const x = Math.random() * (window.innerWidth - target.width);
    const y = Math.random() * (window.innerHeight - target.height);
    target.style.transform = `translate(${x}px, ${y}px)`;
}

target.addEventListener('click', () => {
    score += 5;
    scoreDisplay.textContent = score;
    moverObjetivo();
});

