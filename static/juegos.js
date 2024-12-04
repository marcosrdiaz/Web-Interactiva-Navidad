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
const canvas = document.getElementById('raceCanvas');
const ctx = canvas.getContext('2d');

const sleds = [
    { x: 0, element: document.getElementById('sled1') },
    { x: 0, element: document.getElementById('sled2') },
    { x: 0, element: document.getElementById('sled3') }
];

const raceDistance = canvas.width - 100;
let raceInterval;

function startRace() {
    const sledNumber = parseInt(document.getElementById('sledNumber').value);
    if (isNaN(sledNumber) || sledNumber < 1 || sledNumber > 3) {
        alert('Por favor, ingresa un número de trineo válido (1-3)');
        return;
    }

    sleds.forEach(sled => sled.x = 0);
    updateSledPositions();

    raceInterval = setInterval(() => {
        sleds.forEach((sled, index) => {
            if (index !== 0) { // Los trineos controlados por la IA se mueven automáticamente
                sled.x += Math.random() * 10;
            }
        });

        updateSledPositions();

        const winner = sleds.findIndex(sled => sled.x >= raceDistance);
        if (winner !== -1) {
            clearInterval(raceInterval);
            alert(`¡Trineo ${winner + 1} ha ganado!`);
        }
    }, 100);
}

function updateSledPositions() {
    sleds.forEach(sled => {
        sled.element.style.left = `${sled.x}px`;
    });
}

function handleKeyPress(event) {
    if (event.code === 'Space') {
        sleds[0].x += 10; // Mueve el trineo del jugador
        updateSledPositions();
    }
}

document.getElementById('startRaceButton').addEventListener('click', () => {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('countdown').style.display = 'block';
    let countdown = 3;
    const countdownInterval = setInterval(() => {
        document.getElementById('countdown').textContent = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').style.display = 'none';
            document.getElementById('raceCanvas').style.display = 'block';
            startRace();
        }
    }, 1000);
});

document.addEventListener('keydown', handleKeyPress);