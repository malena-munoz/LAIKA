document.addEventListener('DOMContentLoaded', function() {
    // Evento para crear nueva playlist
    document.getElementById('li-create-playlist').addEventListener('click', function() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', './view/inserts/insert_playlist.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                location.reload();
            } else {
                console.error('Error al insertar la playlist.');
            }
        };
        xhr.send('nombre_playlist=New Playlist');
    });

    // Evento para mostrar playlists
    document.querySelectorAll('.playlist-item').forEach(function(playlist) {
        playlist.addEventListener('click', function() {
            setupPlaylistUser(playlist);
        });
    });
});

async function setupPlaylistUser(playlistCard) {
    var id = playlistCard.getAttribute('data-id');
    var mainDivider = document.getElementById('main-divider');

    // Ocultar la playlist actual si existe
    var currentPlaylistDisplay = document.getElementById('playlist-display');
    if (currentPlaylistDisplay) {
        currentPlaylistDisplay.remove();
    }

    try {
        const response = await fetch('./controller/get_playlist.php?id=' + id);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const playlist = await response.json();
        
        $(document).ready(function() {
            $('#home-real').css({'display': 'none'});
            $('#search-results').css({'display': 'none'});

            var playlistName = playlist.name ? playlist.name : 'Nombre de la playlist';
            var playlistImage = playlist.image ? playlist.image : './assets/img/default-song.png';

            var html = '<div class="main-content" id="playlist-display" style="display: flex">' +
                '<div id="playlist-info" playlist-id="' + id +'"><section>' +
                '<input id="playlist-name" type="text" value="' + playlistName + '" /><div id="playlist-owner">';
            html += '<span id="owner-name">' + playlist.owner + '</span></div><div id="playlist-controls">';
            html += '<span class="material-symbols-rounded" id="play-playlist" onclick="changePlaylistControlStyle(\'play-playlist\'); addPlaylist(); playAtIndex(0);">play_arrow</span>';
            html += '<span class="material-symbols-rounded" id="shuffle-playlist" onclick="shuffleBegin(\'playlist\');">shuffle</span>';
            html += '<span class="material-symbols-rounded" id="add-playlist" onclick="changePlaylistControlStyle(\'add-playlist\');">add</span>';
            html += '</div></section><div id="playlist-img-container" style="background-image: url(\'' + playlistImage + '\');width: 300px;height: 300px;object-fit: cover;object-position: top;border-left: 5px solid var(--mid-lilac);border-top: 5px solid var(--mid-lilac);border-right: 5px solid var(--mid-lilac);border-top-right-radius: 5px;border-top-left-radius: 5px;background-size: cover;background-repeat: no-repeat;background-position: center center;"><input type="file" id="playlist-img-upload" accept=".png, .gif" style="display: none;"></div></div>';
            html += '<div id="song-list"><table class="playlist-table"><thead><tr>';
            html += '<th>#</th><th>Canción</th><th>Álbum</th><th><span class="material-symbols-rounded">timer</span></th></tr></thead>';
            html += '<tbody id="playlist-tbody"></tbody></table></div></div>';

            $('#search-results').after(html);

            // Buscar canciones en la API de Spotify
            var tracks = playlist.tracks;
            var index = 1;
            tracks.forEach(async track => {
                try {
                    var songData = await fetchSpotifyTrack(track.nombre_cancion, track.artista_cancion);
                    var tr = '<tr ondblclick="playSongPlaylist(this);" onmouseover="hoverRowIn(this);" onmouseout="hoverRowOut(this);">';
                    tr += '<td song-id="' + songData.id + '" preview-url="' + songData.preview_url + '">' + (index++) + '</td>';
                    tr += '<td>' + '<img class="song-playlist-img" src="' + songData.image + '" alt="Playlist-Img"/>' +
                        '<section>' + '<span class="playlist-song-title">' + songData.name + '</span>' +
                        '<span class="playlist-song-artist">';
                    var exceededLimit = songData.artist.length > 60;
                    var characters = 0;
                    songData.artist.forEach((artist, i) => {
                        if(i !== songData.artist.length - 1){
                            tr += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + artist.id + '">';
                            tr += artist.name + '</span>, ';
                            characters += artist.name.length;
                        }else{
                            if(exceededLimit){
                                tr += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + artist.id + '">';
                                tr += artist.name.substring(0, 30-characters) + '</span>';
                            }else{
                                tr += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + artist.id + '">';
                                tr += artist.name + '</span>';
                            }
                        }
                    });
                    tr += '</span></section></td>';
                    tr += '<td><span onclick="setupAlbum(this);" class="artist-redirect" id="' + songData.album.id + '">' + songData.album + '</span></td>';
                    tr += '<td>' + minutes(songData.duration_ms) + '</td>';
                    tr += '</tr>';
                    $('#playlist-tbody').append(tr);
                } catch (error) {
                    console.error('Error fetching Spotify track:', error);
                }
            });

            mainDivider.scrollTo({ top: 0 });

            var current_id = document.getElementById('playlist-info').getAttribute('playlist-id');
            var last_id = document.getElementById('last-id') ? document.getElementById('last-id').value : null;
            var shuffle = document.getElementById('shuffle');

            if(current_id == last_id){
                document.getElementById('play-playlist').style.display = 'none';
                if(window.getComputedStyle(shuffle).color !== 'rgb(173, 136, 176)'){
                    document.getElementById('shuffle-playlist').style.color = '#E8DAED';
                }
            }
            openPlaylistAlbum();

            // Agregar eventos para editar el nombre de la playlist y actualizar la imagen
            document.getElementById('playlist-name').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    updatePlaylistName(id, this.value);
                }
            });

            var imgContainer = document.getElementById('playlist-img-container');
            imgContainer.addEventListener('click', function() {
                document.getElementById('playlist-img-upload').click();
            });

            document.getElementById('playlist-img-upload').addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        imgContainer.style.backgroundImage = 'url(' + e.target.result + ')';
                        updatePlaylistImage(id, e.target.result);
                    };
                    reader.readAsDataURL(this.files[0]);
                }
            });
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

async function getSpotifyToken() {
    const client_id = '3b63f06c5a2f46d18d3dcfdd36c48a4c';
    const client_secret = '278627a2b06d4bd4b42a52085fd85ee4';

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error('Failed to obtain Spotify token');
    }

    const data = await response.json();
    return data.access_token;
}


async function fetchSpotifyTrack(nombreCancion, artistaCancion) {
    const token = await getSpotifyToken();
    const query = encodeURIComponent(`${nombreCancion} ${artistaCancion}`);
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch track from Spotify');
    }

    const data = await response.json();
    if (data.tracks.items.length > 0) {
        const track = data.tracks.items[0];
        return {
            id: track.id,
            name: track.name,
            artist: track.artists.map(artist => ({ id: artist.id, name: artist.name })),
            album: track.album.name,
            duration_ms: track.duration_ms,
            preview_url: track.preview_url,
            image: track.album.images[0].url
        };
    } else {
        return {
            id: '',
            name: nombreCancion,
            artist: [{ id: '', name: artistaCancion }],
            album: 'Unknown Album',
            duration_ms: 0,
            preview_url: '',
            image: './assets/img/default-song.png'
        };
    }
}

function minutes(milliseconds) {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


function updatePlaylistName(id, name) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './controller/update_playlist.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.error('Error al actualizar el nombre de la playlist.');
        }
    };
    xhr.send('id=' + id + '&name=' + encodeURIComponent(name));
}

function updatePlaylistImage(id, imageData) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './controller/update_playlist.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status !== 200) {
            console.error('Error al actualizar la imagen de la playlist.');
        }
    };
    xhr.send('id=' + id + '&image=' + encodeURIComponent(imageData));
}