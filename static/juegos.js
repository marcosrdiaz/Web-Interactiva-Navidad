function abrirJuego1() {
    cerrarTodosLosJuegos();
    const juego1 = document.getElementById('juego1');
    juego1.style.display = 'block';
    document.getElementById('pantallaVictoria').style.display = 'none';
    moverObjetivo(); // Mueve el objetivo al iniciar el juego
}

function abrirJuego2() {
    cerrarTodosLosJuegos();
    const juego2 = document.getElementById('juego2');
    juego2.style.display = 'flex';
    document.getElementById('startScreen').style.display = 'block';
    document.getElementById('raceCanvas').style.display = 'none';
    document.getElementById('playerSled').style.display = 'none';
    document.getElementById('flecha').style.display = 'none';
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
    resetPositions();
    clearInterval(interval); // Detener el intervalo
}

function cerrarTodosLosJuegos() {
    document.querySelectorAll('.juego-oculto').forEach(juego => {
        juego.style.display = 'none';
    });
}

// Lógica del juego 1 (Detén al Grinch)
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const pantallaVictoria = document.getElementById('pantallaVictoria');
let score = 0;


function moverObjetivo() {

    if (window.innerWidth < 769) {
        // Pantallas de menos de 769 píxeles
        scoreDisplay.textContent = score;
        const gameContainer = document.querySelector('#juego1');
        const maxWidth = gameContainer.clientWidth;
        const maxHeight = gameContainer.clientHeight;

        const x = Math.random() * (maxWidth - target.width - 20);
        const y = Math.random() * (maxHeight - target.height - 20);
        target.style.transform = `translate(${x}px, ${y}px) rotate(90deg)`;
    } else {
        // Pantallas de 768 píxeles o más
        scoreDisplay.textContent = score;
        const gameContainer = document.querySelector('#juego1');
        const maxWidth = gameContainer.clientWidth;
        const maxHeight = gameContainer.clientHeight;

        const targetWidth = target.clientWidth;
        const targetHeight = target.clientHeight;

        // Define un rango seguro para las coordenadas
        const maxX = maxWidth - targetWidth;
        const maxY = maxHeight - targetHeight;

        // Genera coordenadas aleatorias dentro del rango seguro
        const x = getRandomInt(0, maxX);
        const y = getRandomInt(-(maxHeight/2), maxY/2);
        target.style.transform = `translate(${x}px, ${y}px)`;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

target.addEventListener('click', () => {
    score += 5;
    moverObjetivo();
    if (score >= 50) {
        mostrarVictoria();
    }
});

function mostrarVictoria() { 
    pantallaVictoria.style.display = 'flex';  // Mostramos la pantalla oculta
}

// Lógica del juego 2 (Carrera de trineos)
// Referencias a elementos importantes
const startScreen = document.getElementById('startScreen');
const playerSled = document.getElementById('playerSled');
const flecha = document.getElementById('flecha');
const sled2 = document.getElementById('sled2');
const sled3 = document.getElementById('sled3');
const raceCanvas = document.getElementById('raceCanvas');
const startButton = document.getElementById('startRaceButton');

// Posiciones iniciales
function resetPositions() {
    const isDesktop = window.innerWidth >= 769;

    if (isDesktop) {
        // Posiciones para pantallas de escritorio
        sled2.style.top = '72vh';
        sled2.style.left = '0vw';

        sled3.style.top = '54vh';
        sled3.style.left = '0vw';

        playerSled.style.top = '36vh';
        playerSled.style.left = '0vw';

        flecha.style.top = '20vh';
        flecha.style.left = '0vw';
    } else {
        // Posiciones para pantallas móviles y tablets
        sled2.style.top = '0px';
        sled2.style.left = '10px';

        sled3.style.top = '0px';
        sled3.style.left = '130px';

        playerSled.style.top = '0px';
        playerSled.style.left = '250px';

        flecha.style.top = '500px';
        flecha.style.left = '350px';
    }
}

// Iniciar carrera
startButton.addEventListener('click', startRace);

function startRace() {
    resetPositions(); 
    startScreen.style.display = 'none'; 
    raceCanvas.style.display = 'block';
    playerSled.style.display = 'block';
    flecha.style.display = 'block';
    sled2.style.display = 'block';
    sled3.style.display = 'block';
    startGame();
}

let interval; // Variable para almacenar el identificador del intervalo

function startGame() {
    let playerPosition = 0;
    let flechaPosition = 0;
    let sled2Position = 0;
    let sled3Position = 0;

    const isDesktop = window.innerWidth >= 769;

    // Movimiento del jugador (click para avanzar)
    window.addEventListener('click', () => {
        if (isDesktop) {
            playerPosition += 20; // Incrementa la posición del jugador hacia la derecha
            flechaPosition += 20; // Incrementa la posición de la flecha hacia la derecha
            playerSled.style.left = `${playerPosition}px`;
            flecha.style.left = `${flechaPosition}px`;
        } else {
            playerPosition += 10; // Incrementa la posición del jugador hacia abajo
            flechaPosition += 10; // Incrementa la posición de la flecha hacia abajo
            playerSled.style.top = `${playerPosition}px`;
            flecha.style.top = `${flechaPosition}px`;
        }
    });

    // Movimiento del jugador (barra espaciadora para avanzar)
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            if (isDesktop) {
                playerPosition += 20; // Incrementa la posición del jugador hacia la derecha
                flechaPosition += 20; // Incrementa la posición de la flecha hacia la derecha
                playerSled.style.left = `${playerPosition}px`;
                flecha.style.left = `${flechaPosition}px`;
            } else {
                playerPosition += 10; // Incrementa la posición del jugador hacia abajo
                flechaPosition += 10; // Incrementa la posición de la flecha hacia abajo
                playerSled.style.top = `${playerPosition}px`;
                flecha.style.top = `${flechaPosition}px`;
            }
        }
    });

    // Movimiento automático de los trineos 2 y 3
    interval = setInterval(() => {
        if (isDesktop) {
            sled2Position += Math.random() * 5 + 5; // Movimiento aleatorio hacia la derecha
            sled3Position += Math.random() * 5 + 5;

            sled2.style.left = `${sled2Position}px`;
            sled3.style.left = `${sled3Position}px`;

            // Condición de finalización (llegada a la meta en el borde derecho del canvas)
            if (playerPosition >= window.innerWidth || sled2Position >= window.innerWidth || sled3Position >= window.innerWidth) {
                clearInterval(interval);
                declareWinner(playerPosition, sled2Position, sled3Position);
            }
        } else {
            sled2Position += Math.random() * 5 + 1; // Movimiento aleatorio hacia abajo
            sled3Position += Math.random() * 5 + 1;

            sled2.style.top = `${sled2Position}px`;
            sled3.style.top = `${sled3Position}px`;

            // Condición de finalización (llegada a la meta en la parte inferior del canvas)
            if (playerPosition >= 600 || sled2Position >= 600 || sled3Position >= 600) {
                clearInterval(interval);
                declareWinner(playerPosition, sled2Position, sled3Position);
            }
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
    raceCanvas.style.display = 'none';
    playerSled.style.display = 'none';
    flecha.style.display = 'none';
    sled2.style.display = 'none';
    sled3.style.display = 'none';
    startScreen.style.display = 'block';
}

