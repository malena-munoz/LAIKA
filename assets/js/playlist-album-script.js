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

// Agrega fondo al tener el cursor encima
function hoverRowIn(row){
    row.style.backgroundColor = '#4A404E';
}

// Quita fondo al no tener el cursor encima
function hoverRowOut(row){
    row.style.backgroundColor = '';
}

// Obtiene la info de la fila en la playlist
function playSongPlaylist(row){
    var previewUrl = row.cells[0].getAttribute('preview-url');
    var songName = row.cells[1].querySelector('.playlist-song-title').textContent;
    var artists = row.cells[1].querySelector('.playlist-song-artist').textContent;
    var imageUrl = row.cells[1].querySelector('img').getAttribute('src');

    $(document).ready(function(){
        $('#playing-song-info h3').text(songName);
        $('#playing-song-info h4').text(artists);
        playing_song_audio.src = previewUrl;
        $('#img-current-song img').attr('src', imageUrl);
        playNewSong();
    });
}

// Obtiene la info de la fila en el álbum
function playSongAlbum(row){
    var previewUrl = row.cells[0].getAttribute('preview-url');
    var songName = row.cells[1].querySelector('.playlist-song-title').textContent;
    var artists = (row.cells[1].querySelector('.additional-artists').textContent).replace(' · ', '');
    var imageUrl = document.querySelector('#playlist-img').getAttribute('src');
    $(document).ready(function(){
        $('#playing-song-info h3').text(songName);
        $('#playing-song-info h4').text(artists);
        playing_song_audio.src = previewUrl;
        $('#img-current-song img').attr('src', imageUrl);
        playNewSong();
    });
}