function abrirJuego1() {
    cerrarTodosLosJuegos();
    const juego1 = document.getElementById('juego1');
    juego1.style.display = 'block';
    moverObjetivo(); // Mueve el objetivo al iniciar el juego
}

function abrirJuego2() {
    cerrarTodosLosJuegos();
    const juego2 = document.getElementById('juego2');
    juego2.style.display = 'flex';
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('countdown').style.display = 'none';
    document.getElementById('raceCanvas').style.display = 'none';
    document.getElementById('playerSled').style.display = 'none';
    document.getElementById('sled2').style.display = 'none';
    document.getElementById('sled3').style.display = 'none';
}

function cerrarJuego1() {
    const juego1 = document.getElementById('juego1');
    juego1.style.display = 'none';
    score = 0;
}

function cerrarJuego2() {
    const juego2 = document.getElementById('juego2');
    juego2.style.display = 'none';
}

function cerrarTodosLosJuegos() {
    document.querySelectorAll('.juego-oculto').forEach(juego => {
        juego.style.display = 'none';
    });
}

// Lógica del juego 1 (Detén al Grinch)
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
let score = 0;


function moverObjetivo() {
    scoreDisplay.textContent = score;
    const gameContainer = document.querySelector('#juego1');
    const maxWidth = gameContainer.clientWidth;
    const maxHeight = gameContainer.clientHeight;

    const x = Math.random() * (maxWidth - target.width);
    const y = Math.random() * (maxHeight - target.height);
    target.style.transform = `translate(${x}px, ${y}px)`;
}

target.addEventListener('click', () => {
    score += 5;
    moverObjetivo();
});

// Lógica del juego 2 (Carrera de trineos)
// Referencias a elementos importantes
// Referencias a elementos importantes
const startScreen = document.getElementById('startScreen');
const countdown = document.getElementById('countdown');
const playerSled = document.getElementById('playerSled');
const sled2 = document.getElementById('sled2');
const sled3 = document.getElementById('sled3');
const raceCanvas = document.getElementById('raceCanvas');
const startButton = document.getElementById('startRaceButton');

// Posiciones iniciales
function resetPositions() {
    playerSled.style.top = '0px';
    playerSled.style.left = '10px';

    sled2.style.top = '0px';
    sled2.style.left = '155px';

    sled3.style.top = '0px';
    sled3.style.left = '300px';
}

// Iniciar carrera
startButton.addEventListener('click', startRace);

function startRace() {
    resetPositions(); // Restablece las posiciones iniciales
    startScreen.style.display = 'none'; // Oculta la pantalla de inicio
    countdown.style.display = 'block'; // Muestra el contador
    let counter = 3;

    const timer = setInterval(() => {
        countdown.textContent = counter;
        counter--;

        if (counter < 0) {
            clearInterval(timer);
            countdown.style.display = 'none';
            raceCanvas.style.display = 'block';
            playerSled.style.display = 'block';
            sled2.style.display = 'block';
            sled3.style.display = 'block';
            startGame();
        }
    }, 1000);
}

function startGame() {
    let playerPositionY = 0;
    let sled2PositionY = 0;
    let sled3PositionY = 0;

    // Movimiento del jugador (click para avanzar)
    window.addEventListener('click', () => {
        playerPositionY += 10; // Incrementa la posición del jugador hacia abajo
        playerSled.style.top = `${playerPositionY}px`;
    });

    // Movimiento automático de los trineos 2 y 3
    const interval = setInterval(() => {
        sled2PositionY += Math.random() * 5 + 1; // Movimiento aleatorio hacia abajo
        sled3PositionY += Math.random() * 5 + 1;

        sled2.style.top = `${sled2PositionY}px`;
        sled3.style.top = `${sled3PositionY}px`;

        // Condición de finalización (llegada a la meta en la parte inferior del canvas)
        if (playerPositionY >= 600 || sled2PositionY >= 600 || sled3PositionY >= 600) {
            clearInterval(interval);
            declareWinner(playerPositionY, sled2PositionY, sled3PositionY);
        }
    }, 100);
}

function declareWinner(playerPos, sled2Pos, sled3Pos) {
    let winner = 'Jugador';
    if (sled2Pos >= 600 && sled2Pos > playerPos && sled2Pos > sled3Pos) {
        winner = 'Trineo 2';
    } else if (sled3Pos >= 600 && sled3Pos > playerPos && sled3Pos > sled2Pos) {
        winner = 'Trineo 3';
    }

    alert(`¡${winner} ha ganado la carrera!`);
}

