// Función para mostrar el loader
function showLoader() {
    document.getElementById('loader-overlay').style.display = 'block';
}

// Función para ocultar el loader
function hideLoader() {
    document.getElementById('loader-overlay').style.display = 'none';
}

// Muestra el loader cuando se está cargando contenido
window.addEventListener('load', hideLoader); // Oculta el loader cuando la página se ha cargado completamente
document.addEventListener('DOMContentLoaded', showLoader); // Muestra el loader cuando se ha cargado el DOM
window.addEventListener('beforeunload', showLoader); // Muestra el loader antes de que la página se cierre o recargue

// AJAX request example
function fetchImages() {
    showLoader(); // Mostrar el loader antes de la solicitud AJAX
    // Realizar la solicitud AJAX para obtener imágenes
    // Supongamos que aquí se hace la llamada AJAX para obtener imágenes
    // Una vez que se reciban las imágenes, se debe ocultar el loader
    setTimeout(function() {
        hideLoader(); // Ocultar el loader después de recibir las imágenes (simulado con setTimeout)
    }, 2000); // Simulación de tiempo de espera de 2 segundos (ajustar según la realidad)
}