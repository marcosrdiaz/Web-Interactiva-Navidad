document.getElementById("confirm").addEventListener("click", function () {
  const date = document.getElementById("date").value;
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const packageType = document.getElementById("package").value;
  const people = document.getElementById("people").value;

  if (!date || !email || !name || !packageType || !people) {
    alert("Por favor completa todos los campos.");
    return;
  }

  alert(`Reserva confirmada:\n- Fecha: ${date}\n- Correo: ${email}\n- Nombre: ${name}\n- Paquete: ${packageType}\n- Personas: ${people}`);
});

document.getElementById("cancel").addEventListener("click", function () {
  if (confirm("¿Estás seguro de que deseas cancelar la reserva?")) {
    document.getElementById("date").value = "";
    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("package").value = "estándar";
    document.getElementById("people").value = "";
  }
});
