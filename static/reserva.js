document.getElementsByClassName('form-section')[0].addEventListener('submit', function (event) {
    event.preventDefault();
    let realUser = sessionStorage.getItem('loggedInUser');
    if (!realUser){
        showAlert('Primero debes iniciar sesión.');
        return;
    }

    const fecha = document.getElementById('date').value;
    const mail = document.getElementById('email').value;
    const inputUsername = document.getElementById('name').value;
    const paquete = document.getElementById('package').value;
    const personas = document.getElementById('people').value;
    if (!esFechaPosterior(fecha)) {
        showAlert('Introduce una fecha válida');
        return;
    }

    let users = localStorage.getItem("usersSanta");
    if (users) {
        users = JSON.parse(users);
    } else {
        users = [];
    }
    realUser = JSON.parse(realUser);
    const realUsername = realUser.username;
    const userIndex = users.findIndex(user => user.username === realUsername);
    if (userIndex === -1) {
        showAlert(`Ha habido un problema encontrando el usuario "${realUsername}"`);
        return;
    }
    const newReserva = {
        name: inputUsername,
        email: mail,
        fecha: fecha,
        paquete: paquete,
        personas: personas
    }

    // Asignar la carta al usuario
    users[userIndex].reservas.push(newReserva);
    realUser.reservas.push(newReserva);

    // Guardar de nuevo los usuarios en localStorage
    localStorage.setItem("usersSanta", JSON.stringify(users));
    sessionStorage.setItem("loggedInUser", JSON.stringify(realUser));

    showAlert('Reserva registrada exitosamente');
    // Vaciar los campos del formulario 
    borrarReserva();
    return;
});

function borrarReserva() {
    document.getElementById('date').value = '';
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('package').value = '';
    document.getElementById('people').value = '';
}

// Función para comprobar si la fecha es posterior a hoy
function esFechaPosterior(fecha) {
    const hoy = new Date();
    const fechaObj = new Date(fecha);
    // Ignorar la hora y comparar solo la fecha
    hoy.setHours(0, 0, 0, 0);
    return fechaObj > hoy;
}

function mostrarDisplayReservas() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const reservas = loggedInUser.reservas;
    let currentIndex = 0;

    // Crear el contenedor principal
    const displayContainer = document.createElement('div');
    displayContainer.id = 'displayCartas';
    displayContainer.classList.add('display-cartas');
    displayContainer.style.display = 'none'; // Inicialmente oculto

    // Contenedor superior para la carta
    const cartaContentSection = document.createElement('div');
    cartaContentSection.id = 'cartaContentSection';
    cartaContentSection.classList.add('carta-content-section');

    const cartaContent = document.createElement('p');
    cartaContent.id = 'cartaContent';
    cartaContentSection.appendChild(cartaContent);

    // Contenedor inferior para los botones
    const controlsSection = document.createElement('div');
    controlsSection.id = 'controlsSection';
    controlsSection.classList.add('controls-section');

    // Crear los botones
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Anterior';
    prevButton.classList.add('nav-button');
    prevButton.onclick = () => {
        currentIndex = (currentIndex - 1 + reservas.length) % reservas.length;
        updateCartaContent();
    };

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Siguiente';
    nextButton.classList.add('nav-button');
    nextButton.onclick = () => {
        currentIndex = (currentIndex + 1) % reservas.length;
        updateCartaContent();
    };

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.classList.add('close-button');
    closeButton.onclick = () => {
        document.body.removeChild(displayContainer);
    };

    // Añadir los botones a la sección
    controlsSection.appendChild(prevButton);
    controlsSection.appendChild(nextButton);
    controlsSection.appendChild(closeButton);

    // Añadir las secciones al contenedor
    displayContainer.appendChild(cartaContentSection);
    displayContainer.appendChild(controlsSection);

    document.body.appendChild(displayContainer);

    // Función para actualizar el contenido de la carta
    function updateCartaContent() {
        const reserva = reservas[currentIndex];
        cartaContent.innerHTML = `
            <em>Nombre:</em> ${reserva.name}<br>
            <em>Email:</em> ${reserva.email}<br>
            <em>Paquete:</em> ${reserva.paquete}<br>
            <em>Fecha:</em> ${reserva.fecha}<br>
            <em>Destino:</em> La Ponia<br>
            <em>Personas:</em> ${reserva.personas}
        `;
    }

    // Mostrar la primera carta y hacer visible el display
    updateCartaContent();
    displayContainer.style.display = 'flex';
}