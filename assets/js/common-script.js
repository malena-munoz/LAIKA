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
    var forgotPasswordForm = document.getElementById('forgotPassword-form');
    
    if (type === 'login') {
        forgotPasswordForm.style.display = 'none';
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    } else if (type === 'register') {
        forgotPasswordForm.style.display = 'none';
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    } else if (type === 'forgotPassword') {
        registerForm.style.display = 'none';
        loginForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
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
    var forgotPasswordLink = document.getElementById('forgot');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (event) {
            event.preventDefault();
            openModal('forgotPassword');
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

// Funcionalidad a las fechas de scroll en la página principal
document.addEventListener("DOMContentLoaded", function() {
    const scrollContainers = document.querySelectorAll(".scroll-container");
    const landingContainer = document.querySelector("#home-real");

    scrollContainers.forEach(scrollContainer => {
        const scrollLeft = scrollContainer.querySelector(".scroll-left");
        const scrollRight = scrollContainer.querySelector(".scroll-right");
        const mainContentDiv = scrollContainer.querySelector("div");

        scrollLeft.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: -(landingContainer.clientWidth/2), // Ajusta la cantidad de desplazamiento según tus necesidades
                behavior: "smooth"
            });
        });

        scrollRight.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: (landingContainer.clientWidth/2), // Ajusta la cantidad de desplazamiento según tus necesidades
                behavior: "smooth"
            });
        });
    });
});

//---------------------------------------------------------------------------------------

// Vuelve a mostrar el contenido inicial
function goHome(){  
    // Contenedor primario
    var mainDivider = document.getElementById('main-divider');
    mainDivider.scrollTo({
        top: 0
    });
    // Contenedor del inicio
    const home = document.getElementById('home-real');
    home.style.display = 'block';
    // Contenedor de playlist/album
    var playlist = document.getElementById('playlist-display');
    if (playlist) {
        playlist.remove();
    }
}

// -----------------------------------------------------------------------------------------------------------------------------------------

// Devuelve un tipo de saludo, según la hora (formato 24h)
function obtenerSaludo() {
    var hora = new Date().getHours();
    if (hora >= 7 && hora < 14) {
        return "¡Buenos días!";
    } else if (hora >= 14 && hora < 20) {
        return "¡Buenas tardes!";
    } else {
        return "¡Buenas noches!";
    }
}

// Obtener el elemento donde mostrar el saludo
var mensajeSaludo = document.getElementById("greetings"); // Ajusta el ID según tu HTML
// Mostrar el saludo
mensajeSaludo.textContent = obtenerSaludo();
