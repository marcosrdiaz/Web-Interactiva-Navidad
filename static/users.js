// Obtener los elementos del DOM
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");
// Obtener el modal de alerta y el botón de cerrar
const alertModal = document.getElementById("alertModal");
const closeAlertBtn = document.getElementById("closeAlertBtn");
const alertMessage = document.getElementById("alertMessage");
// Obtener el modal y elementos necesarios
const confirmModal = document.getElementById("confirmModal");
const confirmMessage = document.getElementById("confirmMessage");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

// Función para mostrar el modal de alerta
function showAlert(message) {
    alertMessage.innerHTML = message;  // Actualizar el mensaje de alerta
    alertModal.style.display = "flex";  // Mostrar el modal
}
// Función para mostrar el modal de confirmación
function showConfirm(message) {
    return new Promise((resolve) => {
        // Establecer el mensaje y mostrar el modal
        confirmMessage.innerHTML = message;
        confirmModal.style.display = "flex";

        // Manejar el clic en "Confirmar"
        confirmBtn.onclick = () => {
            confirmModal.style.display = "none"; // Ocultar el modal
            resolve(true); // Resolver la promesa con true
        };

        // Manejar el clic en "Cancelar"
        cancelBtn.onclick = () => {
            confirmModal.style.display = "none"; // Ocultar el modal
            resolve(false); // Resolver la promesa con false
        };

        // Cerrar el modal al hacer clic en la "X"
        closeConfirm.onclick = () => {
            confirmModal.style.display = "none";
            resolve(false); // Resolver como false
        };

        // Cerrar el modal si se hace clic fuera de él
        window.onclick = (event) => {
            if (event.target == confirmModal) {
                confirmModal.style.display = "none";
                resolve(false); // Resolver como false
            }
        };
    });
}

// Funciones para abrir y cerrar los modales
btnLogin.onclick = function() {
    loginModal.style.display = "flex";
    registerModal.style.display = "none";
}

btnRegister.onclick = function() {
    registerModal.style.display = "flex";
    loginModal.style.display = "none";
}

closeLogin.onclick = function() {
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    loginModal.style.display = "none";
}

closeRegister.onclick = function() {
    document.getElementById('regUsername').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPass1').value = '';
    document.getElementById('regPass2').value = '';
    document.getElementById('regGenero').value = '';
    registerModal.style.display = "none";
}

closeAlertBtn.onclick = function() {
    alertModal.style.display = "none";
}


// Cerrar el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
    if (event.target == alertModal) {
        alertModal.style.display = "none";
    }
}

// Funciones para registrar al usuario
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const mail = document.getElementById('regEmail').value;
    const pass1 = document.getElementById('regPass1').value;
    const pass2 = document.getElementById('regPass2').value;
    const genero = document.getElementById('regGenero').value;


    if (!username || username.length < 3) return showAlert('Nombre de usuario demasiado corto');
    //if (passwordNotEnough(password)) return showAlert('Contraseña insuficiente');
    if (pass1 !== pass2) return showAlert('Las contraseñas no coinciden');

    let users = localStorage.getItem("usersSanta");
    if (users) {
        users = JSON.parse(users);
    } else {
        users = [];
    }
    if (users[username]) {
        showAlert('Este nombre de usuario ya está registrado.');
        return;
    }
    const newUser = {
        username: username,
        mail: mail,
        password: pass1,
        genero: genero,
        cartas:[]
    };
    users.push(newUser);
    localStorage.setItem("usersSanta",JSON.stringify(users));

    showAlert('Usuario registrado exitosamente');
    document.getElementById('registerModal').style.display = 'none';
});

// Validación de contraseña
function passwordNotEnough(pass) {
    if (pass.length !== 12) return true;
    if (!/[A-Z]/.test(pass)) return true;
    if (!/[a-z]/.test(pass)) return true;
    if (!/\d.\d/.test(pass)) return true;
    if (!/[!@#$%^&(),.?":{}|<>]/.test(pass)) return true;
    return false;
}

// Manejo del formulario de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    let users = localStorage.getItem("usersSanta");
    if (users) {
        users = JSON.parse(users);
    } else {
        showAlert("No puedes iniciar sesión sin registrarte");
        return;
    }

    // Buscar usuario en el array de usuarios
    const usuario = users.find(user => user.username === username && user.password === password);

    if (usuario) {
        iniciarSesion(usuario, usuario.genero);
        loginModal.style.display = "none";   
        return;  
    } else {
        showAlert('Usuario o contraseña incorrectos');
        return;
    }
});

// Función para manejar el inicio de sesión exitoso
function iniciarSesion(usuario, gen) {
    // Guardar el usuario en sesión (sessionStorage) para mantenerlo autenticado
    sessionStorage.setItem('loggedInUser', JSON.stringify(usuario));

    // Cambiar barra de navegación
    document.getElementById('btnLogin').classList.add('hidden');
    document.getElementById('btnRegister').classList.add('hidden');

    // Crear un botón de perfil usando una imagen en lugar de texto
    const navbar = document.getElementById('navSesion');
    const perfilButton = document.createElement('img');
    if (gen == "hombre") { perfilButton.src = '/styles/images/perfilM.png' } // Ruta a la imagen del perfil elfo
    else { perfilButton.src = 'styles/images/perfilF.png' };
    perfilButton.alt = 'Perfil';
    perfilButton.style.cursor = 'pointer'; // Cambiar el cursor al pasar por encima

    perfilButton.onclick = mostrarPerfilMenu;
    perfilButton.id = 'perfilIcon'; // Agregar un ID para referencia futura
    navbar.appendChild(perfilButton);

    // Auto llenar el campo del formulario 'enviar carta' 
    document.getElementById('usernameCarta').value = usuario['username'];
}

// Cerrar sesión
function cerrarSesion() {
    sessionStorage.removeItem('loggedInUser');
    location.reload(); // Recargar la página para resetear la interfaz
}

// Evitar la perdida de sesion (la foto de perfil)
document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        alert('Usuario detectado');
        const usuario = JSON.parse(loggedInUser);
        iniciarSesion(usuario, usuario.gen);
    }
});

// Función para mostrar el menú de perfil
function mostrarPerfilMenu() {
    const menu = document.getElementById('perfilMenu');
    menu.classList.toggle('hidden');
}


// Ver perfil del usuario
function verPerfil() {
    const usuario = JSON.parse(sessionStorage.getItem('loggedInUser'));
    // Crear el contenido del formulario de edición
    const editarContent = `
        <div class="modal" style="display: flex;">
            <div class="modal-content">
                <h2>Editar Perfil de ${usuario.username}</h2>
                <form id="editProfileForm">
                    <label for="editUsername">Username:</label>
                    <input type="text" id="editUsername" value="${usuario.username}" required>
                    <label for="editEmail">Correo Electrónico:</label>
                    <input type="email" id="editEmail" value="${usuario.mail}" required>
                    <button class="btn" type="submit" style="margin-right: 1vw;">Guardar Cambios</button>
                    <button class="btn" onclick="cerrarModalPerfil()">Cancelar</button>
                </form>
            </div>
        </div>
    `;
    modal = document.getElementById('profileEditorContainer')
    modal.innerHTML = editarContent;
    modal.style.display = 'block';

    // Añadir evento al formulario
    modal.addEventListener('submit', function(event) {
        event.preventDefault();
        guardarCambios(usuario.username);
        modal.style.display = 'none';
        editarContent = '';
    });
}

function cerrarModalPerfil() {
    const modal = document.getElementById('profileEditorContainer');
    modal.style.display = 'none';
}

// Función para guardar los cambios realizados por el usuario
function guardarCambios(usuarioName) {
    // Obtener los valores de los inputs
    const newUsername = document.getElementById('editUsername').value;
    const newEmail = document.getElementById('editEmail').value;

    // Obtener los datos actuales de los usuarios desde localStorage
    let users = localStorage.getItem("usersSanta");
    if (users) {
        users = JSON.parse(users);
    } else {
        showAlert("Ha ocurrido un error cargando los usuarios."); // Esto no debería pasar normalmente
        return;
    }

    // Buscar al usuario actual en la lista de usuarios
    const userIndex = users.findIndex(user => user.username === usuarioName);
    if (userIndex === -1) {
        showAlert("No se ha encontrado el usuario actual.");
        return;
    }

    // Verificar si el nuevo nombre de usuario ya está en uso por otro usuario
    const usernameExists = users.some(
        (user, index) => user.username === newUsername && index !== userIndex
    );
    if (usernameExists) {
        showAlert('El nombre de usuario ya está registrado por otro usuario.');
        return;
    }

    // Actualizar los datos del usuario
    users[userIndex].username = newUsername;
    users[userIndex].mail = newEmail;

    // Guardar los datos actualizados en localStorage
    localStorage.setItem('usersSanta', JSON.stringify(users));

    // Actualizar los datos del usuario autenticado en sessionStorage
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.username === usuarioName) {
        loggedInUser.username = newUsername;
        loggedInUser.mail = newEmail;
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }

    // Mostrar un mensaje de confirmación
    showAlert('Datos actualizados correctamente.');
}
