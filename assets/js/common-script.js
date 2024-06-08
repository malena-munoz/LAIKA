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
                left: -(landingContainer.clientWidth/2), 
                behavior: "smooth"
            });
        });

        scrollRight.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: (landingContainer.clientWidth/2),
                behavior: "smooth"
            });
        });
    });
});

// Funcionalidad a las fechas de scroll en la página de búsqueda
document.addEventListener("DOMContentLoaded", function() {
    const landingContainer = document.querySelector("#search-results");
    const searchContainer = landingContainer.querySelector('.main-content');
    const scrollContainers = searchContainer.querySelectorAll('.scroll-container');

    scrollContainers.forEach(scrollContainer => {
        const scrollLeft = scrollContainer.querySelector(".scroll-left");
        const scrollRight = scrollContainer.querySelector(".scroll-right");
        const mainContentDiv = scrollContainer.querySelector("div");

        scrollLeft.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: -(landingContainer.clientWidth/2), 
                behavior: "smooth"
            });
        });

        scrollRight.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: (landingContainer.clientWidth/2),
                behavior: "smooth"
            });
        });
    });
});


//---------------------------------------------------------------------------------------


// Funcionalidad del menú del reproductor
document.addEventListener('DOMContentLoaded', function () {
    // Menú desplegable + listas
    var menu = document.querySelector('#playing-song-buttons .dropdown-menu');
    var lists = document.querySelector('.dropdown-lists.drop-player');
    // Icono del menú
    var menu_icon = document.getElementById('menu');

    menu_icon.addEventListener("click", function() {
        var options = menu.querySelectorAll('a');
        if(menu_icon.getAttribute('open') === 'no'){
            menu_icon.setAttribute('open', 'yes');
            menu.style.visibility = 'visible';
        }else{
            menu_icon.setAttribute('open', 'no');
            menu.style.visibility = 'hidden';
            lists.style.display = 'none';
            options.forEach(option => {
                option.style.backgroundColor = "";
            });
        }

        options.forEach(option => {
            option.addEventListener("click", function (){
                if(option.textContent === 'Agregar en...'){
                    if(window.getComputedStyle(option).backgroundColor === 'rgb(74, 64, 78)'){
                        option.style.backgroundColor = "#755B7D";
                        lists.style.display = 'flex';
                        loadUserPlaylists(); // Load playlists when 'Agregar en...' is clicked
                    }else{
                        option.style.backgroundColor = "";
                        lists.style.display = 'none';
                    }
                }
            });
        });
    });
});

function loadUserPlaylists() {
    fetch('./controller/get_user_playlists.php')
        .then(response => response.json())
        .then(playlists => {
            var select = document.getElementById('lists');
            select.innerHTML = ''; // Clear previous options

            playlists.forEach(playlist => {
                if (playlist.editable == 1) {
                    var option = document.createElement('option');
                    option.value = playlist.id_playlist;
                    option.textContent = playlist.nombre_playlist;
                    select.appendChild(option);
                }
            });
        })
        .catch(err => console.error('Error loading playlists:', err));
}

// Guardar canción en la playlist seleccionada
document.getElementById('player-add-song').addEventListener('click', function() {
    var select = document.getElementById('lists');
    var selectedOption = select.options[select.selectedIndex]; // Obtener la opción seleccionada
    var idPlaylist = select.value;
    var songTitle = document.getElementById('song-title').textContent;
    var songArtists = document.getElementById('song-artists').textContent;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', './controller/add_song_to_playlist.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Canción agregada exitosamente.');
            Swal.fire({
                title: '¡Éxito!',
                text: "Canción agregada exitosamente a " + selectedOption.textContent + "",
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } else {
            console.error('Error al agregar la canción a la playlist.');
            Swal.fire({
                title: 'Error',
                text: 'Error al agregar la canción a la playlist.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };
    xhr.send('id_playlist=' + encodeURIComponent(idPlaylist) + '&nombre_cancion=' + encodeURIComponent(songTitle) + '&artista_cancion=' + encodeURIComponent(songArtists));
});


//---------------------------------------------------------------------------------------


// Camnia la flecha de despliegue
document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('lists');
    var arrow = document.getElementById('list-arrow');

    select.addEventListener('click', function() {
        if(arrow.getAttribute('src') === './assets/img/arrow.svg'){
            arrow.setAttribute('src', './assets/img/arrow_down.svg');
        }else{
            arrow.setAttribute('src', './assets/img/arrow.svg');
        }
    });

    select.addEventListener('blur', function() {
        arrow.setAttribute('src', './assets/img/arrow.svg');
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
    // Elementos hijos
    const childrenArray = Array.from(document.getElementById('main-divider').children);
    childrenArray.forEach(child => {
        if (child.tagName.toLowerCase() === 'div') {
            if(child.getAttribute('id') === 'home-real'){
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        }
    });
    // Footer
    const footer = document.querySelector('.footer');
    footer.style.display = 'flex';
    // Contenedor de playlist/album
    var playlist = document.getElementById('playlist-display');
    if (playlist) {
        playlist.remove();
    }
     // Contenedor de artista
    var artist = document.getElementById('artist-display');
    if (artist) {
        artist.remove();
    }
    // Playlist o álbum agregado + índice
    wasAdded = false;
    tempIndex = -1;
}

//---------------------------------------------------------------------------------------

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
var mensajeSaludo = document.getElementById('greetings'); // Ajusta el ID según tu HTML
// Mostrar el saludo
mensajeSaludo.textContent = obtenerSaludo();


//---------------------------------------------------------------------------------------

// Visibiliza o no, los inputs de las contraseñas
function togglePassword(span) {
    const passwordInput = span.previousElementSibling;

    if (span.textContent === 'visibility') {
        passwordInput.type = 'text';
        span.textContent = 'visibility_off'; // Cambiar el icono
    } else {
        passwordInput.type = 'password';
        span.textContent = 'visibility';
    }
}


//---------------------------------------------------------------------------------------

// Visibiliza o no, el display de los ajustes
function openSettings(){
    // Elementos hijos
    const childrenArray = Array.from(document.getElementById('main-divider').children);
    childrenArray.forEach(child => {
        if (child.tagName.toLowerCase() === 'div') {
            if(child.getAttribute('id') === 'settings-display'){
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        }
    });
    // Footer
    const footer = document.querySelector('.footer');
    footer.style.display = 'none';
    // Playlist o álbum agregado + índex
    wasAdded = false;
    tempIndex = -1;
}

function openUser(){
    // Elementos hijos
    const childrenArray = Array.from(document.getElementById('main-divider').children);
    childrenArray.forEach(child => {
        if (child.tagName.toLowerCase() === 'div') {
            if(child.getAttribute('id') === 'user-display'){
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        }
    });
    // Una vez termine todo, el scroll vuelve arriba del todo
    document.getElementById('main-divider').scrollTo({
        top: 0
    })
    // Playlist o álbum agregado + índex
    wasAdded = false;
    tempIndex = -1;
}

function openPlaylistAlbum(){
    // Elementos hijos
    const childrenArray = Array.from(document.getElementById('main-divider').children);
    childrenArray.forEach(child => {
        if (child.tagName.toLowerCase() === 'div') {
            if(child.getAttribute('id') === 'playlist-display'){
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        }
    });
    // Una vez termine todo, el scroll vuelve arriba del todo
    document.getElementById('main-divider').scrollTo({
        top: 0
    })
}

function openArtist(){
    // Elementos hijos
    const childrenArray = Array.from(document.getElementById('main-divider').children);
    childrenArray.forEach(child => {
        if (child.tagName.toLowerCase() === 'div') {
            if(child.getAttribute('id') === 'artist-display'){
                child.style.display = 'flex';
            } else {
                child.style.display = 'none';
            }
        }
    });
    // Una vez termine todo, el scroll vuelve arriba del todo
    document.getElementById('main-divider').scrollTo({
        top: 0
    })
}

// Muestra u oculta la vista
function displaySearch(visible){
    // Elementos hijos
    const childrenArray = Array.from(document.getElementById('main-divider').children);
    childrenArray.forEach(child => {
        if (child.tagName.toLowerCase() === 'div') {
            if(visible){
                if(child.getAttribute('id') === 'search-results'){
                    child.style.display = 'block';
                } else {
                    child.style.display = 'none';
                }
            }else{
                if(child.getAttribute('id') === 'search-results'){
                    child.style.display = 'none';
                }
                if(child.getAttribute('id') === 'home-real'){
                    child.style.display = 'block';
                }
            }
        }
    });
    // Una vez termine todo, el scroll vuelve arriba del todo
    document.getElementById('main-divider').scrollTo({
        top: 0
    })
    // Contenedor de playlist/album
    var playlist = document.getElementById('playlist-display');
    if (playlist) {
        playlist.remove();
    }
     // Contenedor de artista
    var artist = document.getElementById('artist-display');
    if (artist) {
        artist.remove();
    }
}

// Los controles se ocultan o no
document.addEventListener('DOMContentLoaded', function() {
    var img = document.querySelector('#img-current-song img');

    if(img.getAttribute('src') === 'assets\\img\\default-song.png'){
        document.getElementById('playing-song-buttons').style.display = 'none';
    }else{
        document.getElementById('playing-song-buttons').style.display = 'flex';
    }
});

// Los controles se ocultan o no
document.addEventListener('mouseover', function() {
    var img = document.querySelector('#img-current-song img');

    if(img.getAttribute('src') === 'assets\\img\\default-song.png'){
        document.getElementById('playing-song-buttons').style.display = 'none';
    }else{
        document.getElementById('playing-song-buttons').style.display = 'flex';
    }
});

function openFooterModal(footer){
    var footerTxt = footer.textContent;
    document.querySelector('#content h3').textContent = footerTxt;
    console.log(document.getElementById('scrollable-modal').scrollTop)
    if(footerTxt === 'Sobre nosotros'){
        document.getElementById('policy').style.display = 'none';
        document.getElementById('about').style.display = 'flex';
        document.querySelector('.accept').textContent = 'Entiendo';
    }else{
        document.getElementById('policy').style.display = 'flex';
        document.getElementById('about').style.display = 'none';
        document.querySelector('.accept').textContent = 'Acepto las condiciones';
    }
    document.getElementById('footer-modal').style.display = 'block';
    document.getElementById('scrollable-modal').scrollTop = 0;
}

function closeFooterModal(){
    document.getElementById('footer-modal').style.display = 'none';
}