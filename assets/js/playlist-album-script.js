// Función que cambia el estilo del control pulsado
function changePlaylistControlStyle(controlID) {
    var control = document.getElementById(controlID);

    switch(controlID){
        case 'shuffle-playlist':
            if(window.getComputedStyle(control).color==='rgb(173, 136, 176)'){
                control.style.color = '#E8DAED';
            }else{
                control.style.color = 'rgb(173, 136, 176)';
            }
            break;
        case 'add-playlist':
            if(window.getComputedStyle(control).color==='rgb(173, 136, 176)'){
                control.style.color = '#E8DAED';
                savePlaylistLink(); // Llama a la función para guardar el enlace
            }else{
                control.style.color = 'rgb(173, 136, 176)';
            }
            break;
    }
}

function savePlaylistLink() {
    // Aquí obtienes el enlace de la playlist o álbum
    var playlistId = document.getElementById('playlist-info').getAttribute('playlist-id');
    var playlistLink = playlistId;

    var data = {
        playlistLink: playlistLink
    };

    // Realiza una llamada AJAX para guardar el enlace
    $.ajax({
        type: 'POST',
        url: './controller/guardar_enlace.php',
        data: data,
        success: function(response) {
            console.log('Enlace de playlist guardado exitosamente en la base de datos.');
            Swal.fire({
                title: '¡Éxito!',
                text: "Playlist/álbum guardado correctamente",
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                location.reload(true);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al guardar el enlace de la playlist en la base de datos:', error);
            Swal.fire({
                title: 'Error',
                text: 'Error al guardar el enlace de la playlist en la base de datos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}

// Agrega fondo al tener el cursor encima
function hoverRowIn(row){
    row.style.backgroundColor = '#4A404E';
}

// Quita fondo al no tener el cursor encima
function hoverRowOut(row){
    row.style.backgroundColor = '';
}
