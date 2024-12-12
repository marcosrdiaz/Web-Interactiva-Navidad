// Inicializar mapa
const map = L.map('map').setView([0, 0], 2); // Coordenadas iniciales

// Cargar un mapa base con nombres en inglés (CartoDB Positron)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors © CartoDB',
    subdomains: 'abcd',
    id: 'map',
    language: 'en' // Opcional: Configuración de idioma constante
}).addTo(map);

// Marcador de Papá Noel
const santaIcon = L.icon({
    iconUrl: '/images/santa_icon_map.png', // Imagen del trineo
    iconSize: [50, 50],
    iconAnchor: [25, 50],
});

const santaMarker = L.marker([0, 0], { icon: santaIcon }).addTo(map);

// Coordenadas ampliadas (con más lugares)
const locations = [
    { name: "Sídney, Australia", coords: [-33.8688, 151.2093] },
    { name: "Tokio, Japón", coords: [35.6895, 139.6917] },
    { name: "Moscú, Rusia", coords: [55.7558, 37.6173] },
    { name: "Londres, Reino Unido", coords: [51.5074, -0.1278] },
    { name: "Nueva York, EE.UU.", coords: [40.7128, -74.0060] },
    { name: "Buenos Aires, Argentina", coords: [-34.6037, -58.3816] },
    { name: "Ciudad del Cabo, Sudáfrica", coords: [-33.9249, 18.4241] },
    { name: "Río de Janeiro, Brasil", coords: [-22.9068, -43.1729] },
    { name: "París, Francia", coords: [48.8566, 2.3522] },
    { name: "Berlín, Alemania", coords: [52.5200, 13.4050] },
    { name: "Copenhague, Dinamarca", coords: [55.6761, 12.5683] },
    { name: "Ottawa, Canadá", coords: [45.4215, -75.6972] },
    { name: "Beijing, China", coords: [39.9042, 116.4074] },
    { name: "Nueva Delhi, India", coords: [28.6139, 77.2090] },
    { name: "Estambul, Turquía", coords: [41.0082, 28.9784] },
    { name: "Seúl, Corea del Sur", coords: [37.5665, 126.9780] },
    { name: "El Cairo, Egipto", coords: [30.0444, 31.2357] },
    { name: "Ciudad de México, México", coords: [19.4326, -99.1332] },
    { name: "Santiago, Chile", coords: [-33.4489, -70.6693] },
    { name: "Dublín, Irlanda", coords: [53.3498, -6.2603] },
    { name: "Dubai, Emiratos Árabes Unidos", coords: [25.276987, 55.296249] },
    { name: "Singapur, Singapur", coords: [1.3521, 103.8198] },
    { name: "Bangkok, Tailandia", coords: [13.7563, 100.5018] },
    { name: "Helsinki, Finlandia", coords: [60.1699, 24.9384] },
    { name: "Reikiavik, Islandia", coords: [64.1466, -21.9426] },
    { name: "Auckland, Nueva Zelanda", coords: [-36.8485, 174.7633] },
    { name: "Manila, Filipinas", coords: [14.5995, 120.9842] },
    { name: "Lima, Perú", coords: [-12.0464, -77.0428] },
    { name: "Oslo, Noruega", coords: [59.9139, 10.7522] },
    { name: "Madrid, España", coords: [40.4168, -3.7038] },
    { name: "Roma, Italia", coords: [41.9028, 12.4964] },
    { name: "Honolulu, Hawái", coords: [21.3069, -157.8583] },
    { name: "Madrid, España", coords:[40.416775, -3.703790] }
];


// Función para mover suavemente el marcador
function moveMarker(marker, startCoords, endCoords, duration = 2000) {
    const startTime = performance.now();
    const [startLat, startLng] = startCoords;
    const [endLat, endLng] = endCoords;

    function animateMarker(currentTime) {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1); // Normalizar tiempo entre 0 y 1
        const currentLat = startLat + t * (endLat - startLat);
        const currentLng = startLng + t * (endLng - startLng);

        marker.setLatLng([currentLat, currentLng]); // Actualizar posición del marcador

        if (t < 1) {
            requestAnimationFrame(animateMarker); // Continuar animación
        }
    }

    requestAnimationFrame(animateMarker);
}

// Animación de Santa
let i = 0;
function moveSanta() {
    const currentLocation = locations[i];
    const nextLocation = locations[(i + 1) % locations.length]; // Volver al inicio cuando termine
    const { coords: startCoords } = currentLocation;
    const { coords: endCoords, name } = nextLocation;

    // Desplazar marcador
    moveMarker(santaMarker, startCoords, endCoords);

    // Suavemente mover el mapa al nuevo destino
    map.panTo(endCoords);

    i = (i + 1) % locations.length; // Avanzar al siguiente destino
}

setInterval(moveSanta, 5000); // Mover cada 5 segundos