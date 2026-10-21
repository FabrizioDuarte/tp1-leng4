const nombreInput = document.getElementById("nombre");
const latitudInput = document.getElementById("latitud");
const longitudInput = document.getElementById("longitud");
const btnAbrir = document.getElementById("btnAbrir");
const mensaje = document.getElementById("mensaje");

// Permite ingresar decimales tanto con coma como con punto.
function convertirCoordenada(valor) {
    return Number(valor.trim().replace(",", "."));
}

function mostrarError(texto) {
    mensaje.textContent = texto;
}

function limpiarError() {
    mensaje.textContent = "";
}

function abrirUbicacion() {
    limpiarError();

    const nombre = nombreInput.value.trim();
    const latitudTexto = latitudInput.value.trim();
    const longitudTexto = longitudInput.value.trim();

    // Verificamos que todos los campos estén completos.
    if (nombre === "" || latitudTexto === "" || longitudTexto === "") {
        mostrarError("Por favor, complete todos los campos.");
        return;
    }

    const latitud = convertirCoordenada(latitudTexto);
    const longitud = convertirCoordenada(longitudTexto);

    // Verificamos que latitud y longitud sean números.
    if (Number.isNaN(latitud) || Number.isNaN(longitud)) {
        mostrarError("Latitud y longitud deben ser valores numéricos.");
        return;
    }

    // Rango válido de latitud: -90 a 90.
    if (latitud < -90 || latitud > 90) {
        mostrarError("La latitud debe estar entre -90 y 90.");
        return;
    }

    // Rango válido de longitud: -180 a 180.
    if (longitud < -180 || longitud > 180) {
        mostrarError("La longitud debe estar entre -180 y 180.");
        return;
    }

    // Creamos la URL de Google Maps con las coordenadas ingresadas.
    const coordenadas = `${latitud},${longitud}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordenadas)}`;

    // Abrimos Google Maps en una nueva pestaña.
    window.open(url, "_blank", "noopener,noreferrer");
}

// Abrir al hacer clic en el botón.
btnAbrir.addEventListener("click", abrirUbicacion);

// También permite abrir presionando Enter en cualquiera de los campos.
[nombreInput, latitudInput, longitudInput].forEach((input) => {
    input.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            abrirUbicacion();
        }
    });
});
