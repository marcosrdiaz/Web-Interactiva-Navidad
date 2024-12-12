function mostrarReceta(idReceta) {
    document.querySelector(".menu-recetas").style.display = "none";
    document.querySelectorAll(".detalle-receta").forEach(div => div.style.display = "none");
    const recetaDiv = document.getElementById(idReceta);

    if (idReceta === "tortitas") {
        recetaDiv.innerHTML = `
            <h2>Sabrosas Tortitas</h2>
            <p>Resultado Final:</p>
            <img src="/images/pankakes.png" alt="Pancakes">
            <hr>
            <h3>Ingredientes:</h3>
            <ul>
                <li>1 taza de harina</li>
                <li>1 cucharada de azúcar</li>
                <li>1 cucharadita de polvo para hornear</li>
                <li>1/2 cucharadita de sal</li>
                <li>1 taza de leche</li>
                <li>1 huevo</li>
                <li>2 cucharadas de mantequilla derretida</li>
            </ul>
            <hr>
            <h3>Pasos a Seguir:</h3>
            <ol>
                <li>Mezcla los ingredientes secos en un bowl.</li>
                <li>En otro bowl, mezcla la leche, el huevo y la mantequilla.</li>
                <li>Une ambas mezclas y revuelve hasta obtener una masa homogénea.</li>
                <li>Calienta una sartén y engrásala ligeramente.</li>
                <li>Vierte porciones de la masa y cocina hasta que aparezcan burbujas.</li>
                <li>Voltea y cocina el otro lado hasta que esté dorado.</li>
            </ol>
            <button onclick="volverAlMenu()">Volver al Menú</button>
        `;
    }

    if (idReceta === "caramelo") {
        recetaDiv.innerHTML = `
            <h2>Bastón de Caramelo</h2>
            <p>Resultado Final:</p>
            <img src="/images/baston_caramelo.png" alt="Bastón de caramelo">
            <hr>
            <h3>Ingredientes:</h3>
            <ul>
                <li>1 taza de azúcar</li>
                <li>1/2 taza de jarabe de maíz</li>
                <li>1/4 taza de agua</li>
                <li>1/2 cucharadita de extracto de menta</li>
                <li>Colorante rojo y blanco</li>
            </ul>
            <hr>
            <h3>Pasos a Seguir:</h3>
            <ol>
                <li>Calienta el azúcar, jarabe y agua hasta alcanzar 150 °C (usa un termómetro de caramelo).</li>
                <li>Añade el extracto de menta y divide la mezcla en dos.</li>
                <li>Colorea una parte con rojo y deja la otra blanca.</li>
                <li>Trabaja ambas mezclas en forma de bastón y déjalas enfriar.</li>
            </ol>
            <button onclick="volverAlMenu()">Volver al Menú</button>
        `;
    }

    if (idReceta === "galletas") {
        recetaDiv.innerHTML = `
            <h2>Galletas Navideñas</h2>
            <p>Resultado Final:</p>
            <img src="/images/galletas.jpg" alt="Galletas">
            <hr>
            <h3>Ingredientes:</h3>
            <ul>
                <li>2 tazas de harina</li>
                <li>1/2 taza de azúcar</li>
                <li>1 cucharadita de polvo de hornear</li>
                <li>1/2 cucharadita de sal</li>
                <li>1 huevo</li>
                <li>1 taza de mantequilla</li>
                <li>Glaseado para decorar</li>
            </ul>
            <hr>
            <h3>Pasos a Seguir:</h3>
            <ol>
                <li>Precalienta el horno a 180 °C.</li>
                <li>Mezcla harina, azúcar, polvo de hornear y sal.</li>
                <li>Añade huevo y mantequilla, amasa hasta obtener una masa suave.</li>
                <li>Corta en formas navideñas y hornea por 10-12 minutos.</li>
                <li>Decora con glaseado y deja enfriar.</li>
            </ol>
            <button onclick="volverAlMenu()">Volver al Menú</button>
        `;
    }

    if (idReceta === "chocolate") {
        recetaDiv.innerHTML = `
            <h2>Chocolate Caliente</h2>
            <p>Resultado Final:</p>
            <img src="/images/chocolate.png" alt="Chocolate Caliente">
            <hr>
            <h3>Ingredientes:</h3>
            <ul>
                <li>2 tazas de leche</li>
                <li>1/4 taza de cacao en polvo</li>
                <li>1/4 taza de azúcar</li>
                <li>1/4 taza de chispas de chocolate</li>
                <li>Crema batida para decorar</li>
            </ul>
            <hr>
            <h3>Pasos a Seguir:</h3>
            <ol>
                <li>Calienta la leche en una olla.</li>
                <li>Añade cacao, azúcar y chispas de chocolate, mezclando hasta que se disuelvan.</li>
                <li>Vierte en tazas y decora con crema batida.</li>
            </ol>
            <button onclick="volverAlMenu()">Volver al Menú</button>
        `;
    }

    recetaDiv.style.display = "flex";
}

function volverAlMenu() {
    document.querySelectorAll(".detalle-receta").forEach(div => div.style.display = "none");
    const menuRecetas = document.querySelector(".menu-recetas");

    // Restablecer el estilo de display según el tamaño de la pantalla
    if (window.innerWidth <= 600) {
        menuRecetas.style.display = "flex";
        menuRecetas.style.flexDirection = "column";
    } else {
        menuRecetas.style.display = "grid";
        menuRecetas.style.gridTemplateColumns = "1fr 1fr";
        menuRecetas.style.gap = "10px";
}
    } 
