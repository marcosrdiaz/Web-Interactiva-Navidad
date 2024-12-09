document.getElementsByClassName('form-container')[0].addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('emailCarta').value;
    const inputUsername = document.getElementById('usernameCarta').value;
    const letter = document.getElementById('letterCarta').value;

    let users = localStorage.getItem("usersSanta");
    if (users) {
        users = JSON.parse(users);
    } else {
        users = [];
    }
    const userIndex = users.findIndex(user => user.username === inputUsername);
    if (userIndex === -1) {
        showAlert(`Este usuario "${inputUsername}"no se ha registrado`);
        return;
    }
    if (users[userIndex].mail !== email) {
        showAlert('Correo inválido.');
        return;
    }

    // Asignar la carta al usuario
    users[userIndex].cartas.push(letter);

    // Guardar de nuevo los usuarios en localStorage
    localStorage.setItem("usersSanta", JSON.stringify(users));

    showAlert('Carta registrada exitosamente');
});
