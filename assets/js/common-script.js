// Espera a que se cargue todo el contenido de la página
document.addEventListener("DOMContentLoaded", function() {
    // Simula una carga de contenido
    setTimeout(function() {
        // Muestra las cards y oculta el skeleton loader
        var cards = document.querySelectorAll(".card_loader");
        cards.forEach(function(card) {
            card.style.display = "none";
        });
    }, 1200); // Simula un tiempo de carga de 2 segundos, ajusta según sea necesario
});

//---------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('modal');
    var formUI = document.getElementById('form-ui');

    // Abrir el modal
    function openModal() {
        modal.classList.remove('fadeOut');
        modal.style.display = 'block';
    }

    // Cerrar el modal
    function closeModal() {
        modal.classList.add('fadeOut');
        setTimeout(function () {
            modal.style.display = 'none';
        }, 300); // Tiempo de duración de la animación
    }

    // Evento clic en la "x" para cerrar el modal
    var closeButton = document.querySelector('#close-modal .close');
    closeButton.addEventListener('click', closeModal);

    // Evento clic fuera del formulario para cerrar el modal
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Evento clic en el botón "Login" dentro del formulario
    var loginButton = document.getElementById('submit-button');
    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        // Aquí podrías agregar la lógica para enviar los datos del formulario
        closeModal();
    });

    // Evento clic en el botón "Forgot password?"
    var forgotPasswordLink = document.getElementById('forgot-pass');
    forgotPasswordLink.addEventListener('click', function (event) {
        event.preventDefault();
        // Aquí podrías agregar la lógica para el enlace "Forgot password?"
    });

    // Evento clic en el botón para abrir el modal
    document.querySelector('.sparkle-button').addEventListener('click', openModal);
});

