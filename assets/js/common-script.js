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

// Definir openModal globalmente
window.openModal = function (type) {
    var modal = document.getElementById('modal');
    var registerForm = document.getElementById('register-form');
    var loginForm = document.getElementById('login-form');
    
    if (type === 'login') {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    } else if (type === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }

    modal.classList.remove('fadeOut');
    modal.style.display = 'block';
};

document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('modal');
    var registerForm = document.getElementById('register-form');
    var loginForm = document.getElementById('login-form');

    // Cerrar el modal
    function closeModal() {
        modal.classList.add('fadeOut');
        setTimeout(function () {
            modal.style.display = 'none';
            registerForm.style.display = 'none';
            loginForm.style.display = 'none';
        }, 300); // Tiempo de duración de la animación
    }

    // Evento clic en la "x" para cerrar el modal
    var closeButtons = document.querySelectorAll('#close-modal .close');
    closeButtons.forEach(function (closeButton) {
        closeButton.addEventListener('click', closeModal);
    });

    // Evento clic fuera del formulario para cerrar el modal
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Evento clic en el botón "Forgot password?"
    var forgotPasswordLink = document.getElementById('forgot-pass');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (event) {
            event.preventDefault();
            // Aquí podrías agregar la lógica para el enlace "Forgot password?"
        });
    }

    // Eventos clic en los enlaces "No tengo una cuenta" y "Ya tengo una cuenta"
    var noAccountLink = document.querySelector('#login-form #not-logged');
    var hasAccountLink = document.querySelector('#register-form #already-logged');

    if (noAccountLink) {
        noAccountLink.addEventListener('click', function (event) {
            event.preventDefault();
            openModal('register');
        });
    }

    if (hasAccountLink) {
        hasAccountLink.addEventListener('click', function (event) {
            event.preventDefault();
            openModal('login');
        });
    }
});

//---------------------------------------------------------------------------------------

// Vuelve a mostrar el contenido inicial
function goHome(){  
    const home = document.getElementById('home-real');
    home.style.display = 'block';
    const album = document.getElementById('album-display');
    album.style.display = 'none';
}