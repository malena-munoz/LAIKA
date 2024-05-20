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