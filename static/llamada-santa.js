const callButton = document.getElementById('callButton');
const hangUpButton = document.getElementById('hangUpButton');
const santaVideo = document.getElementById('santaVideo');
const message = document.getElementById('message');

callButton.addEventListener('click', () => {
  // Generar un número aleatorio entre 1 y 100
  const randomChance = Math.floor(Math.random() * 100) + 1;

  if (randomChance <= 10) { // 10% de probabilidad
    message.textContent = '¡Santa ha respondido la llamada!';
    santaVideo.hidden = false;
    santaVideo.play();
    callButton.disabled = true; // Desactivar botón de llamada
    hangUpButton.disabled = false; // Activar botón de colgar
  } else {
    message.textContent = 'Santa no está disponible en este momento. Inténtalo de nuevo.';
  }
});

hangUpButton.addEventListener('click', () => {
  santaVideo.pause(); // Pausar el video
  santaVideo.currentTime = 0; // Reiniciar el video
  santaVideo.hidden = true;
  message.textContent = 'Llamada finalizada.';
  callButton.disabled = false; // Reactivar botón de llamada
  hangUpButton.disabled = true; // Desactivar botón de colgar
});
