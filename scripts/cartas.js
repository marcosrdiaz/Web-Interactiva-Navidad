document.getElementsByClassName('form-container')[0].addEventListener('submit', function (event) {
    event.preventDefault();
    let realUser = sessionStorage.getItem('loggedInUser');
    if (!realUser){
        showAlert('Primero debes iniciar sesión.');
        return;
    }

    const direccionCarta = document.getElementById('direccionCarta').value;
    const inputUsername = document.getElementById('usernameCarta').value;
    const letter = document.getElementById('letterCarta').value;

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
    const signedLetter = {
        name: inputUsername,
        dir: direccionCarta,
        contenido: letter
    }

    // Asignar la carta al usuario
    users[userIndex].cartas.push(signedLetter);
    realUser.cartas.push(signedLetter);

    // Guardar de nuevo los usuarios en localStorage
    localStorage.setItem("usersSanta", JSON.stringify(users));
    sessionStorage.setItem("loggedInUser", JSON.stringify(realUser));

    showAlert('Carta registrada exitosamente');
    // Vaciar los campos del formulario 
    document.getElementById('direccionCarta').value = '';
    document.getElementById('usernameCarta').value = realUsername; // sugerencia
    document.getElementById('letterCarta').value = '';
});

function mostrarDisplayCartas() {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const cartas = loggedInUser.cartas;
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
        currentIndex = (currentIndex - 1 + cartas.length) % cartas.length;
        updateCartaContent();
    };

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Siguiente';
    nextButton.classList.add('nav-button');
    nextButton.onclick = () => {
        currentIndex = (currentIndex + 1) % cartas.length;
        updateCartaContent();
    };

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.classList.add('btnrojo');
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
        const carta = cartas[currentIndex];
        cartaContent.innerHTML = `
            <strong>${carta.contenido}</strong><br>
            <em>De:</em> ${carta.name}<br>
            <em>Para:</em> Santa Claus<br>
            <em>Enviar a:</em> ${carta.dir}
        `;
    }

    // Mostrar la primera carta y hacer visible el display
    updateCartaContent();
    displayContainer.style.display = 'flex';
}
