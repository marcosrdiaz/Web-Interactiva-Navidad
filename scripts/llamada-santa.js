const callButton = document.getElementById('callButton');
const hangUpButton = document.getElementById('hangUpButton');
const santaVideo = document.getElementById('santaVideo');
const message = document.getElementById('message');

// Listas de videos
const verticalVideos = [
  "./videos/VS_vert1.mp4"
];

const horizontalVideos = [
  "./videos/VS_hor1.mp4",
  "./videos/VS_hor2.mp4",
  "./videos/VS_hor3.mp4",
  "./videos/VS_hor4.mp4"
];

// Asegurarse de que el video no tenga controles
santaVideo.removeAttribute('controls');

// Función para determinar si la pantalla es vertical u horizontal
function isVerticalScreen() {
  return window.innerWidth < 768; // Menor de 768px es vertical
}

// Función para obtener un video aleatorio según la orientación
function getRandomVideo() {
  const videos = isVerticalScreen() ? verticalVideos : horizontalVideos;
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}

callButton.addEventListener('click', () => {
  // Generar un número aleatorio entre 1 y 100
  const randomChance = Math.floor(Math.random() * 100) + 1;

  if (randomChance <= 20) { // 20% de probabilidad
    message.textContent = '¡Santa ha respondido la llamada!';
    santaVideo.src = getRandomVideo(); // Asignar video aleatorio
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

// Ajustar el video si cambia el tamaño de la pantalla
window.addEventListener('resize', () => {
  if (!santaVideo.hidden) {
    santaVideo.src = getRandomVideo();
    santaVideo.play();
  }
});
