// Función que cambia el estilo del control pulsado
function changePlaylistControlStyle(controlID) {
    var control = document.getElementById(controlID);

    switch(controlID){
        case 'play-playlist':
            if(window.getComputedStyle(control).color === 'rgb(42, 49, 62)'){
                control.style.color = '#E8DAED';
                control.style.backgroundColor = 'transparent';
            }else{
                control.style.color = '#2A313E';
                control.style.backgroundColor = '#AD88B0';
            }
            break;
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
            }else{
                control.style.color = 'rgb(173, 136, 176)';
            }
            break;
    }
}

// Inyecta el html de la playlist o álbum



// Evento durante el cargado de la página (hover de las filas de las tablas)
// document.addEventListener("DOMContentLoaded", function() {

//     // HOVER DE LAS FILAS DE LAS TABLAS

//     const album = document.querySelector('.album-table');
//     const playlist = document.querySelector('.playlist-table');
//     const rowsAlbum = album.querySelectorAll('tbody tr');
//     const rowsPlaylist = playlist.querySelectorAll('tbody tr');

//     rowsAlbum.forEach(row => {
//         row.addEventListener('mouseenter', () => {
//             console.log('Cursor está sobre la fila:', row);
//             row.style.backgroundColor = '#755B7D'; // Cambia el color de fondo al pasar el cursor
//         });
//         row.addEventListener('mouseleave', () => {
//             row.style.backgroundColor = ''; // Restaura el color de fondo cuando el cursor sale de la fila
//         });
//     });

//     rowsPlaylist.forEach(row => {
//         row.addEventListener('mouseenter', () => {
//             console.log('Cursor está sobre la fila:', row);
//             row.style.backgroundColor = '#755B7D'; // Cambia el color de fondo al pasar el cursor
//         });
//         row.addEventListener('mouseleave', () => {
//             row.style.backgroundColor = ''; // Restaura el color de fondo cuando el cursor sale de la fila
//         });
//     });
// });