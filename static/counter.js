// Configurar fecha objetivo
const targetDate = new Date('2024-12-24T23:59:00');

function updateCounter() {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining >= 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.querySelector('.contador-navidad').innerHTML = `
            <div>${String(days).padStart(2, '0')}</div><div>:</div>
            <div>${String(hours).padStart(2, '0')}</div><div>:</div>
            <div>${String(minutes).padStart(2, '0')}</div><div>:</div>
            <div>${String(seconds).padStart(2, '0')}</div>
        `;
    } else {
        document.querySelector('.contador-navidad').textContent = '¡Feliz Navidad!';
    }
}

// Actualizar contador cada segundo
setInterval(updateCounter, 1000);
updateCounter();


function abrirDesplegable(){
    menu = document.getElementById("Menu-desplegable");
    menu.style.display = 'flex';
    menu.style.flex_direction = 'column';
}