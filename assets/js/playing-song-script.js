// Array de objetos que contendrá las canciones en la cola
var songs = [];
// Indice donde se encuentra reproducciendo
var currentIndex = -1;
// Array e índice temporales para el mezclado aleatorio
var tempSongs = []; 
var tempIndex = -1;
// Booleano e IDs para saber si se ha agregado la playlist o álbum
var wasAdded = false;
var lastID = document.getElementById('last-id');

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


// ------------------------------------------------------------------------------------------------


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
        playNext();
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
    lastID.value = document.getElementById('playlist-info').getAttribute('playlist-id');
}

// Obtiene la info de la fila en el álbum
function playSongAlbum(row){
    var index = row.cells[0].textContent - 1;
    $(document).ready(function(){
        addAlbum();
        playAtIndex(index);
    });
    lastID.value = document.getElementById('playlist-info').getAttribute('playlist-id');
}

// Reproduce una canción de la página principal
function playCard(card){
    $(document).ready(function(){
        var title = card.getAttribute('data-name');
        var preview = card.getAttribute('data-preview');
        var img = card.querySelector('img').src;
        var artists = card.querySelectorAll('.artist-redirect');

        $('#playing-song-info h3').text(title);
        $('#playing-song-info h4').empty();
        for(var i=0; i<artists.length; i++){
            if(i != artists.length-1){
                $('#playing-song-info h4').append('<span class="artist-redirect" artist-id="' 
                + artists[i].getAttribute('artist-id') + '" onclick="setupArtist(this);">' + artists[i].textContent + '</span>, ');
            }else{
                $('#playing-song-info h4').append('<span class="artist-redirect" artist-id="' 
                + artists[i].getAttribute('artist-id') + '" onclick="setupArtist(this);">' + artists[i].textContent + '</span>');
            }
        }
        playing_song_audio.src = preview;
        $('#img-current-song img').attr('src', img);

        playNewSong(); 
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
            artists : rows[i].cells[1].querySelector('.additional-artists').cloneNode(true).querySelectorAll('span'),
            previewUrl : rows[i].cells[0].getAttribute('preview-url'),
            imageUrl : document.querySelector('#playlist-img').getAttribute('src')
        };
        songs.push(song);
    }
    wasAdded = true;
    document.getElementById("play-playlist").style.display = 'none';
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
            artists : rows[i].cells[1].querySelector('.playlist-song-artist').cloneNode(true).querySelectorAll('span'),
            previewUrl : rows[i].cells[0].getAttribute('preview-url'),
            imageUrl : rows[i].cells[1].querySelector('img').getAttribute('src')
        };
        songs.push(song);
    }
    // Fue agregada
    wasAdded = true;
    document.getElementById("play-playlist").style.display = 'none';
}

// Reproduce la canción de un album del artista
function playAlbumSong(row){
    var artists = row.cells[1].querySelector('.additional-artists').cloneNode(true).querySelectorAll('span');
    artists.forEach(artist => {
        artist.setAttribute('class', 'artist-redirect');
        artist.setAttribute('onclick', 'setupArtist(this);');
    });
    // Vaciamos el array de la cola
    songs.length = 0;
    $(document).ready(function() {
        $('#playing-song-info h3').text(row.cells[1].querySelector('.playlist-song-title').textContent);
        $('#playing-song-info h4').empty();
        for(let i=0; i<artists.length; i++){
            if(i != artists.length-1){
                $('#playing-song-info h4').append(artists[i]);
                $('#playing-song-info h4').append(", ");
            }else{
                $('#playing-song-info h4').append(artists[i]);
            }
        }
        playing_song_audio.src = row.getAttribute('preview');
        $('#img-current-song img').attr('src', row.getAttribute('image'));
        playNewSong();
        songs.push({
            index : 0,
            name: row.cells[1].querySelector('.playlist-song-title').textContent,
            artists : artists,
            previewUrl : row.getAttribute('preview'),
            imageUrl : row.getAttribute('image')
        });
    });
}

// Reproduce un top del artista
function playTop(song){
    // Vaciamos el array de la cola
    songs.length = 0;
    returnAccessToken()
        .then(function(accessToken) {
            return getTrack(song.getAttribute('song-id'), accessToken);
        })
        .then(function(track) {
            $(document).ready(function() {
                var spans = [];
                $('#playing-song-info h3').text(track.name);
                $('#playing-song-info h4').empty();
                for(let i=0; i<track.artists.length; i++){
                    let span = '<span class="artist-redirect" onclick="setupArtist(this);" artist-id="' + track.artists[i].id + '">' 
                    + track.artists[i].name + '</span>'
                    if(i != track.artists.length-1){
                        $('#playing-song-info h4').append(span);
                        $('#playing-song-info h4').append(", ");
                    }else{
                        $('#playing-song-info h4').append(span);
                    }
                    spans.push(span);
                }
                playing_song_audio.src = track.preview_url;
                $('#img-current-song img').attr('src', track.album.images[0].url);
                playNewSong();
                songs.push({
                    index : 0,
                    name: track.name,
                    artists : spans,
                    previewUrl : track.preview_url,
                    imageUrl : track.album.images[0].url
                });
            });
        })
        .catch(function(err) {
            console.error('Error:', err);
        });
}

// Reproduce la canción en donde se encuentre ese índice
function playAtIndex(index){
    const song = songs[index];
    $(document).ready(function() {
        $('#playing-song-info h3').text(song.name);
        $('#playing-song-info h4').empty();
        for(let i=0; i<song.artists.length; i++){
            if(i != song.artists.length-1){
                $('#playing-song-info h4').append(song.artists[i]);
                $('#playing-song-info h4').append(", ");
            }else{
                $('#playing-song-info h4').append(song.artists[i]);
            }
        }
        playing_song_audio.src = song.previewUrl;
        $('#img-current-song img').attr('src', song.imageUrl);
        playNewSong();
    });
    currentIndex = index;
    tempIndex = song.index;
    lastID.value = document.getElementById('playlist-info').getAttribute('playlist-id');
}


// Reproduce la siguiente canción
function playNext(){
     // Si el índice supera la longitud de la array...
    var index = (currentIndex+1)>=songs.length ? 0 : (currentIndex+1);
    // Canción en ese índice
    const song = songs[index];
    
    $(document).ready(function() {
        $('#playing-song-info h3').text(song.name);
        $('#playing-song-info h4').empty();
        for(let i=0; i<song.artists.length; i++){
            if(i != song.artists.length-1){
                $('#playing-song-info h4').append(song.artists[i]);
                $('#playing-song-info h4').append(", ");
            }else{
                $('#playing-song-info h4').append(song.artists[i]);
            }
        }
        playing_song_audio.src = song.previewUrl;
        $('#img-current-song img').attr('src', song.imageUrl);
        playNewSong();
    });
    currentIndex = index;
    tempIndex = song.index;
    lastID.value = document.getElementById('playlist-info').getAttribute('playlist-id');
}


// Reproduce la anterior canción
function playPrevious(){
    // Si el índice supera el 0...
    var index = (currentIndex-1)<0 ? songs.length-1 : (currentIndex-1);
    // Canción en ese índice
    const song = songs[index];
    
    $(document).ready(function() {
        $('#playing-song-info h3').text(song.name);
        $('#playing-song-info h4').empty();
        for(let i=0; i<song.artists.length; i++){
            if(i != song.artists.length-1){
                $('#playing-song-info h4').append(song.artists[i]);
                $('#playing-song-info h4').append(", ");
            }else{
                $('#playing-song-info h4').append(song.artists[i]);
            }
        }
        playing_song_audio.src = song.previewUrl;
        $('#img-current-song img').attr('src', song.imageUrl);
        playNewSong();
    });
    currentIndex = index;
    tempIndex = song.index;
    lastID.value = document.getElementById('playlist-info').getAttribute('playlist-id');
}


// Mezcla aleatoriamente las canciones de la array
function shuffleSongs(){
    // Span de shuffle
    var shuffleSpan = document.getElementById('shuffle');
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
        if(document.getElementById('shuffle-playlist')){
            document.getElementById('shuffle-playlist').style.color = "#E8DAED";
        }
    }else{
        // Span vuelve al color por defecto
        shuffleSpan.style.color = 'rgb(173, 136, 176)';
        if(document.getElementById('shuffle-playlist')){
            document.getElementById('shuffle-playlist').style.color = "rgb(173, 136, 176)";
        }
        // La array e índice vuelven con los valores temporales
        songs = tempSongs;
        currentIndex = tempIndex;
    }
    lastID.value = document.getElementById('playlist-info').getAttribute('playlist-id');

}

// Mezcla aleatoriamente el álbum o playlist nuevo
function shuffleBegin(type){
    // Span de shuffle
    var shuffleSpan = document.getElementById('shuffle-playlist');
    // IDs de las playlist/álbum
    var current_id = document.getElementById('playlist-info').getAttribute('playlist-id');
    var last_id = document.getElementById('last-id').value;
    // Canción en ese momento
    var song = songs[currentIndex];
    if(window.getComputedStyle(shuffleSpan).color==='rgb(173, 136, 176)'){
        console.log("mezclar");
        // Span más claro
        shuffleSpan.style.color = '#E8DAED';
        document.getElementById('shuffle').style.color = '#E8DAED';
        // Si la playlist o álbum no fue agregada a la cola...
        if(current_id != last_id){
            console.log("nueva");
            switch(type){
                case 'album':
                    addAlbum();
                    break;
                case 'playlist':
                    addPlaylist();
                    break;
            }  
        }
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
        // Si no hay una canción en reproducción...
        if(tempIndex == -1){
            playAtIndex(0);
        }else{
            var index = songs.indexOf(song);
            if(index == -1){
                playAtIndex(0);
            }
        }
    }else{
        console.log("no");
        // Span vuelve al color por defecto
        shuffleSpan.style.color = 'rgb(173, 136, 176)';
        document.getElementById('shuffle').style.color = 'rgb(173, 136, 176)';
        // La array e índice vuelven con los valores temporales
        songs = tempSongs;
        currentIndex = tempIndex;
    }
    console.log(songs);
    lastID.value = document.getElementById('playlist-info').getAttribute('playlist-id');
}