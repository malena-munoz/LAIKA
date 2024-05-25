// Array de objetos que contendrá las canciones en la cola
var songs = [];
// Indice donde se encuentra reproducciendo
var currentIndex = -1;
// Array e índice temporales para el mezclado aleatorio
var tempSongs = []; 
var tempIndex = -1;

// --------------------------------------------------------------------------------------------------------

// Elemento que contiene la canción actual
var playing_song_audio = document.getElementById("playing-song-audio");
// Valor del input del nivel de sonido
var volume_input = document.getElementById("volume-input");
// Valor temporal del volumen
var temp_volume = 0;
// Elemento del icono de sonido
var volume_icon = document.getElementById("volume-icon");
// Elemento del icono del estado de la canción actual
var play_pause_icon = document.getElementById("play-pause");
// Input de barra de progreso que muestra en qué tiempo exacto está reproduciéndose la canción actual
var song_process_input = document.getElementById("song-process-input");


// Cambia el volumen de la canción actual en base al valor del input
function changeVolume() {
    playing_song_audio.volume = volume_input.value/100;
    if(volume_input.value==0){
        volume_icon.textContent = "volume_off";
    }else if(volume_input.value>0 && volume_input.value<74){
        volume_icon.textContent = "volume_down";
    }else{
        volume_icon.textContent = "volume_up";
    }
}

// Cambia el estado de la canción en base al icono (play o pause)
function changeSongStatus() {
    changeVolume();
    if(play_pause_icon.textContent==="play_arrow"){
        play_pause_icon.textContent = "pause";
        playing_song_audio.play();
    }else{
        play_pause_icon.textContent = "play_arrow";
        playing_song_audio.pause();
    }
}

// Reproduce la canción
function playNewSong(){
    changeVolume();
    play_pause_icon.textContent = "pause";
    playing_song_audio.play();
}

// Ensordece o establece el volumen de la canción actual al 50%
function muteOrDesmute(){
    if (volume_icon.textContent==="volume_down"|| volume_icon.textContent==="volume_up"){
        volume_icon.textContent = "volume_off";
        temp_volume = playing_song_audio.volume;
        playing_song_audio.volume = 0;
        volume_input.value = 0;
    }else{
        volume_icon.textContent = "volume_down";
        playing_song_audio.volume = temp_volume;
        volume_input.value = temp_volume*100;
    }
}

// Cambia el valor máximo de la barra de progreso
function changeMaxValueSongProgress(){
    song_process_input.max = Math.trunc(playing_song_audio.duration);
}


// Refresca el valor actual de la barra de progreso mientras la canción actual se está reproduciendo
function refreshProgressBar(){
    song_process_input.value = Math.trunc(playing_song_audio.currentTime);
    if(song_process_input.value==song_process_input.max){
        play_pause_icon.textContent = "play_arrow";
    }
}

// Refresca el valor actual del tiempo de la canción cuando se hace clic en un sitio específico de la barra de progreso
function refreshProgressSong(){
    playing_song_audio.currentTime = Math.trunc(song_process_input.value);
}

// Obtiene la info de la fila en la playlist
function playSongPlaylist(row){
    var index = row.cells[0].textContent - 1;
    $(document).ready(function(){
        addPlaylist();
        playAtIndex(index);
    });
}

// Obtiene la info de la fila en el álbum
function playSongAlbum(row){
    var index = row.cells[0].textContent - 1;
    $(document).ready(function(){
        addAlbum();
        playAtIndex(index);
    });
}

// Agrega las canciones del álbum al array
function addAlbum(){
    const albumSongs = document.getElementById('album-tbody');
    const rows = albumSongs.getElementsByTagName('tr');
    
    // Vaciamos el array de la cola
    songs.length = 0;
    // Recorremos las filas para rellenar el array previamenta vaciado
    for (let i = 0; i < rows.length; i++) {
        const song = {
            index : rows[i].cells[0].textContent - 1,
            name: rows[i].cells[1].querySelector('.playlist-song-title').textContent,
            artists : (rows[i].cells[1].querySelector('.additional-artists').textContent).replace(' · ', ''),
            previewUrl : rows[i].cells[0].getAttribute('preview-url'),
            imageUrl : document.querySelector('#playlist-img').getAttribute('src')
        };
        songs.push(song);
    }
}

// Agrega las canciones de la playlist al array
function addPlaylist(){
    const playlistSongs = document.getElementById('playlist-tbody');
    const rows = playlistSongs.getElementsByTagName('tr');
    
    // Vaciamos el array de la cola
    songs.length = 0;
    // Recorremos las filas para rellenar el array previamenta vaciado
    for (let i = 0; i < rows.length; i++) {
        const song = {
            index : rows[i].cells[0].textContent - 1,
            name: rows[i].cells[1].querySelector('.playlist-song-title').textContent,
            artists : rows[i].cells[1].querySelector('.playlist-song-artist').textContent,
            previewUrl : rows[i].cells[0].getAttribute('preview-url'),
            imageUrl : rows[i].cells[1].querySelector('img').getAttribute('src')
        };
        songs.push(song);
    }
}

// Reproduce la canción en donde se encuentre ese índice
function playAtIndex(index){
    const song = songs[index];
    $(document).ready(function() {
        $('#playing-song-info h3').text(song.name);
        $('#playing-song-info h4').text(song.artists);
        playing_song_audio.src = song.previewUrl;
        $('#img-current-song img').attr('src', song.imageUrl);
        playNewSong();
    });
    currentIndex = index;
    tempIndex = song.index;
}



// Reproduce la siguiente canción
function playNext(){
     // Si el índice supera la longitud de la array...
    var index = (currentIndex+1)>=songs.length ? 0 : (currentIndex+1);
    // Canción en ese índice
    const song = songs[index];
    
    $(document).ready(function() {
        $('#playing-song-info h3').text(song.name);
        $('#playing-song-info h4').text(song.artists);
        playing_song_audio.src = song.previewUrl;
        $('#img-current-song img').attr('src', song.imageUrl);
        playNewSong();
    });
    currentIndex = index;
    tempIndex = song.index;
}



// Reproduce la anterior canción
function playPrevious(){
    // Si el índice supera el 0...
    var index = (currentIndex-1)<0 ? songs.length-1 : (currentIndex-1);
    // Canción en ese índice
    const song = songs[index];
    
    $(document).ready(function() {
        $('#playing-song-info h3').text(song.name);
        $('#playing-song-info h4').text(song.artists);
        playing_song_audio.src = song.previewUrl;
        $('#img-current-song img').attr('src', song.imageUrl);
        playNewSong();
    });
    currentIndex = index;
    tempIndex = song.index;
}



// Mezcla aleatoriamente las canciones de la array
function shuffleSongs(){
    // Span de shuffle
    var shuffleSpan = document.getElementById('shuffle');
    // Título y artistas de la canción
    var song = document.querySelector('#playing-song-info h3').textContent;
    var artists = document.querySelector('#playing-song-info h4').textContent;
    console.log(song + " " + artists);
    if(window.getComputedStyle(shuffleSpan).color==='rgb(173, 136, 176)'){
        // Span más claro
        shuffleSpan.style.color = '#E8DAED';
        // Array e indice guardado en variables temporales
        tempSongs = songs.slice();
        tempIndex = currentIndex;
        // Copia de la array
        const songsShuffle = songs.slice();
        // Bucle de mezclado
        for (let i = songsShuffle.length - 1; i > 0; i--) {
            let indexRandom = Math.floor(Math.random() * (i + 1));
            let temp = songsShuffle[i];
            songsShuffle[i] = songsShuffle[indexRandom];
            songsShuffle[indexRandom] = temp;
        }
        // La array principal pasa a ser la misma mezclada
        songs = songsShuffle;
    }else{
         // Span vuelve al color por defecto
        shuffleSpan.style.color = 'rgb(173, 136, 176)';
        // La array e índice vuelven con los valores temporales
        songs = tempSongs;
        currentIndex = tempIndex;
    }

}

