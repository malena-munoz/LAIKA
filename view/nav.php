<?php
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

$idUsuario = isset($_SESSION['idUsuario']) ? $_SESSION['idUsuario'] : -1;

$conn = new mysqli($hostname, $username, $password, $database, $port);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT id_playlist, nombre_playlist, foto_playlist FROM usuario_playlists WHERE id_usuario = '$idUsuario' AND editable = 1";
$result = $conn->query($sql);
$playlists = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $playlists[] = $row;
    }
}

$sql = "SELECT id_playlist, link_playlist FROM usuario_playlists WHERE id_usuario = '$idUsuario' AND editable = 0";
$result = $conn->query($sql);
$spotifyPlaylists = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $spotifyPlaylists[] = $row;
    }
}
$conn->close();
?>
<nav class="nav-playlists">
    <div id="vertical-container">
        <div id="scrollable-content">
            <section class="filler"></section>
            <ul id="playlist-list">
                <?php if ($idUsuario != -1): ?>
                    <?php foreach ($playlists as $playlist): ?>
                        <li class="playlist-item" data-id="<?php echo $playlist['id_playlist']; ?>">
                            <?php
                            if (!empty($playlist['foto_playlist'])) {
                                $imageSrc = 'data:image/png;base64,' . base64_encode($playlist['foto_playlist']);
                            } else {
                                $imageSrc = './assets/img/default-song.png';
                            }
                            ?>
                            <div class="playlist" style="background-image: url('<?php echo $imageSrc; ?>');"></div>
                        </li>
                    <?php endforeach; ?>
                    <?php foreach ($spotifyPlaylists as $playlist): ?>
                        <li class="spotify-playlist-item" data-id="<?php echo $playlist['id_playlist']; ?>" data-uri="<?php echo $playlist['link_playlist']; ?>"></li>
                    <?php endforeach; ?>
                    <li id="li-create-playlist">
                        <div id="create-playlist" class="playlist"></div>
                    </li>
                <?php endif; ?>
            </ul>
            <section class="filler"></section>
        </div>
        <div id="img-current-song">
            <img src="assets/img/default-song.png" alt="Album of the playing song">
        </div>
    </div>
</nav>

<script>
var clientId2 = 'f1fefd90a53a41789c105f1c142e60ea';
var clientSecret2 = 'fbb1acaa02794067b3a92c6a17859630';

function getAccessToken(callback) {
    $.ajax({
        url: 'https://accounts.spotify.com/api/token',
        type: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId2 + ':' + clientSecret2)
        },
        data: 'grant_type=client_credentials',
        success: function(response) {
            var accessToken = response.access_token;
            callback(accessToken);
        },
        error: function(err) {
            console.error('Error al obtener el token de acceso:', err);
        }
    });
}

function fetchSpotifyData(uri, accessToken, callback) {
    var endpoint = '';
    if (uri.startsWith('spotify:album:')) {
        endpoint = 'https://api.spotify.com/v1/albums/' + uri.split(':')[2];
    } else if (uri.startsWith('spotify:playlist:')) {
        endpoint = 'https://api.spotify.com/v1/playlists/' + uri.split(':')[2];
    }

    $.ajax({
        url: endpoint,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
            callback(response);
        },
        error: function(err) {
            console.error('Error al obtener datos de Spotify:', err);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Evento para mostrar playlists editables
    document.querySelectorAll('.playlist-item').forEach(function(playlist) {
        playlist.addEventListener('click', function() {
            setupPlaylistSpotify(playlist);
        });
    });

    // Obtener y mostrar datos de Spotify para playlists no editables
    getAccessToken(function(accessToken) {
        document.querySelectorAll('.spotify-playlist-item').forEach(function(playlist) {
            var uri = playlist.getAttribute('data-uri');
            fetchSpotifyData(uri, accessToken, function(data) {
                var imageUrl = data.images[0].url;
                var html = '<div class="playlist" img-url="' + imageUrl + '" style="background-image: url(\'' + imageUrl + '\');"></div>';
                playlist.innerHTML = html;
            });

            playlist.addEventListener('click', function() {
                var id = uri.split(':')[2];
                if (uri.startsWith('spotify:album:')) {
                    setupalbumSpotify(id, accessToken);
                } else if (uri.startsWith('spotify:playlist:')) {
                    setupPlaylistSpotify(id, accessToken);
                }
            });
        });
    });
});

async function setupPlaylistSpotify(playlistCard) {
    var id = playlistCard.getAttribute('data-id');
    var mainDivider = document.getElementById('main-divider');

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
                '<div id="playlist-info" playlist-id="' + id +'" playlist-type="user"><section>' +
                '<input id="playlist-name" type="text" value="' + playlistName + '" /><div id="playlist-owner">';
            html += '<span id="owner-name">' + playlist.owner + '</span></div><div id="playlist-controls">';
            html += '<span class="material-symbols-rounded" id="play-playlist" onclick="changePlaylistControlStyle(\'play-playlist\'); addPlaylist(); playAtIndex(0);">play_arrow</span>';
            html += '<span class="material-symbols-rounded" id="shuffle-playlist" onclick="shuffleBegin(\'playlist\');">shuffle</span>';
            html += '<span class="material-symbols-rounded" id="delete-playlist" onclick="changePlaylistControlStyle(\'add-playlist\');">delete_forever</span>';
            html += '</div></section><div id="playlist-img-container" style="background-image: url(\'' + playlistImage + '\');width: 300px;height: 300px;object-fit: cover;object-position: top;border-left: 5px solid var(--mid-lilac);border-top: 5px solid var(--mid-lilac);border-right: 5px solid var(--mid-lilac);border-top-right-radius: 5px;border-top-left-radius: 5px;background-size: cover;background-repeat: no-repeat;background-position: center center;"><input type="file" id="playlist-img-upload" accept=".png" style="display: none;"></div></div>';
            html += '<div id="song-list"><table class="playlist-table"><thead><tr>';
            html += '<th>#</th><th>Canción</th><th>Álbum</th><th><span class="material-symbols-rounded">timer</span></th></tr></thead>';
            html += '<tbody id="playlist-tbody"></tbody></table></div></div>';

            $('#search-results').after(html);

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

            document.getElementById('playlist-name').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    updatePlaylistName(id, this.value);
                }
            });

            document.getElementById('delete-playlist').addEventListener('click', function(e) {
                deletePlaylist(id, document.getElementById('playlist-info').getAttribute('playlist-type'));
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
    alert("Nombre de la playlist cambiado exitosamente.");
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
    alert("Imagen de la playlist cargada exitosamente.");
    location.reload(true);
}

async function setupPlaylistSpotify(id, accessToken) {
    fetchSpotifyData('spotify:playlist:' + id, accessToken, function(playlist) {
        displayPlaylistUsuario(playlist);
    });
}

async function setupalbumSpotify(id, accessToken) {
    fetchSpotifyData('spotify:album:' + id, accessToken, function(album) {
        displayAlbumUsuario(album);
    });
}

function displayPlaylistUsuario(playlist) {
    var mainDivider = document.getElementById('main-divider');
    var currentPlaylistDisplay = document.getElementById('playlist-display');
    if (currentPlaylistDisplay) {
        currentPlaylistDisplay.remove();
    }

    $(document).ready(function() {
        $('#home-real').css({'display': 'none'});
        $('#search-results').css({'display': 'none'});

        var html = '<div class="main-content" id="playlist-display" style="display: flex">' +
            '<div id="playlist-info" playlist-id="' + playlist.uri +'" playlist-type="link_playlist"><section>' +
            '<span id="playlist-name">' + (playlist.name.length > 25 ? playlist.name.substring(0, 25) + '...' : playlist.name) + '</span><div id="playlist-owner">';
        html += '<span id="owner-name">' + playlist.owner.display_name + '</span></div><div id="playlist-controls">';
        html += '<span class="material-symbols-rounded" id="play-playlist" onclick="changePlaylistControlStyle(\'play-playlist\'); addPlaylist(); playAtIndex(0);">play_arrow</span>';
        html += '<span class="material-symbols-rounded" id="shuffle-playlist" onclick="shuffleBegin(\'playlist\');">shuffle</span>';
        html += '<span class="material-symbols-rounded" id="delete-playlist" onclick="changePlaylistControlStyle(\'add-playlist\');">delete_forever</span>';
        html += '</div></section><img id="playlist-img" src="' + playlist.images[0].url + '" alt="' + playlist.name + '"></div>';
        html += '<div id="song-list"><div id="song-list"><table class="playlist-table"><thead><tr>';
        html += '<th>#</th><th>Canción</th><th>Álbum</th><th><span class="material-symbols-rounded">timer</span></th></tr></thead>';
        html += '<tbody id="playlist-tbody"></tbody></table></div></div>';

        $('#search-results').after(html);

        var tracks = playlist.tracks.items;
        var index = 1;
        tracks.forEach(track => {
            var tr = '<tr onclick="playSongPlaylist(this);" onmouseover="hoverRowIn(this);" onmouseout="hoverRowOut(this);">';
            tr += '<td song-id="' + track.track.id + '" preview-url="' + track.track.preview_url + '">' + (index++) + '</td>';
            tr += '<td>' + '<img class="song-playlist-img" src="' + track.track.album.images[0].url + '" alt="Playlist-Img"/>' +
                '<section>' + '<span class="playlist-song-title">' + track.track.name + '</span>' +
                '<span class="playlist-song-artist">';
            var exceededLimit = track.track.artists.map(artist => artist.name).join(', ').length > 60;
            for (var i = 0; i < track.track.artists.length; i++) {
                var characters = 0;
                if (i != track.track.artists.length - 1) {
                    tr += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + track.track.artists[i].id + '">';
                    tr += track.track.artists[i].name + '</span>, ';
                    characters += track.track.artists[i].name.length;
                } else {
                    if (exceededLimit) {
                        tr += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + track.track.artists[i].id + '">';
                        tr += track.track.artists[i].name.substring(0, 30 - characters) + '</span>';
                    } else {
                        tr += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + track.track.artists[i].id + '">';
                        tr += track.track.artists[i].name + '</span>';
                    }
                }
            }
            tr += '</span></section></td>';
            tr += '<td><span onclick="setupAlbum(this);" class="artist-redirect" id="' + track.track.album.id + '">' + track.track.album.name + '</span></td>';
            tr += '<td>' + minutes(track.track.duration_ms) + '</td>';
            tr += '</tr>';
            $('#playlist-tbody').append(tr);
        });

        document.getElementById('delete-playlist').addEventListener('click', function(e) {
            deletePlaylist(playlist.uri, document.getElementById('playlist-info').getAttribute('playlist-type'));
        });

        mainDivider.scrollTo({ top: 0 });

        var current_id = document.getElementById('playlist-info').getAttribute('playlist-id');
        var last_id = document.getElementById('last-id').value;
        var shuffle = document.getElementById('shuffle');

        if (current_id == last_id) {
            document.getElementById('play-playlist').style.display = 'none';
            if (window.getComputedStyle(shuffle).color !== 'rgb(173, 136, 176)') {
                document.getElementById('shuffle-playlist').style.color = '#E8DAED';
            }
        }
        openPlaylistAlbum();
    });
}

function displayAlbumUsuario(album) {
    var mainDivider = document.getElementById('main-divider');
    var currentPlaylistDisplay = document.getElementById('playlist-display');
    if (currentPlaylistDisplay) {
        currentPlaylistDisplay.remove();
    }

    $(document).ready(function() {
        $('#home-real').css({'display': 'none'});
        $('#search-results').css({'display': 'none'});

        var html = '<div class="main-content" id="playlist-display" style="display: flex">' +
            '<div id="playlist-info" playlist-id="' + album.uri +'" playlist-type="link_playlist"><section>' +
            '<span id="playlist-name">' + (album.name.length > 25 ? album.name.substring(0, 25) + '...' : album.name) + '</span><div id="playlist-owner">';
        html += '<span id="owner-name">';

        var exceededLimit = album.artists.map(artist => artist.name).join(', ').length > 30;
        for (var i = 0; i < album.artists.length; i++) {
            var characters = 0;
            if (i != album.artists.length - 1) {
                html += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + album.artists[i].id + '">';
                html += album.artists[i].name + '</span>, ';
                characters += album.artists[i].name.length;
            } else {
                if (exceededLimit) {
                    html += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + album.artists[i].id + '">';
                    html += album.artists[i].name.substring(0, 30 - characters) + '</span>';
                } else {
                    html += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + album.artists[i].id + '">';
                    html += album.artists[i].name + '</span>';
                }
            }
        }

        html += '</span></div><div id="playlist-controls">';
        html += '<span class="material-symbols-rounded" id="play-playlist" onclick="addAlbum(); playAtIndex(0);">play_arrow</span>';
        html += '<span class="material-symbols-rounded" id="shuffle-playlist" onclick="shuffleBegin(\'album\');">shuffle</span>';
        html += '<span class="material-symbols-rounded" id="delete-playlist" onclick="changePlaylistControlStyle(\'add-playlist\');">delete_forever</span>';
        html += '</div></section><img id="playlist-img" src="' + album.images[0].url + '" alt="' + album.name + '"></div>';
        html += '<div id="song-list"><div id="song-list"><table class="album-table"><thead><tr>';
        html += '<th>#</th><th>Canción</th><th><span class="material-symbols-rounded">timer</span></th></tr></thead>';
        html += '<tbody id="album-tbody"></tbody></table></div></div>';

        $('#search-results').after(html);

        var tracks = album.tracks.items;
        var index = 1;
        tracks.forEach(track => {
            var tr = '<tr onclick="playSongAlbum(this);" onmouseover="hoverRowIn(this);" onmouseout="hoverRowOut(this);">';
            tr += '<td song-id="' + track.id + '" preview-url="' + track.preview_url + '">' + (index++) + '</td>';
            tr += '<td><span class="playlist-song-title">' + track.name + '</span><span class="additional-artists" style="color: #929CB0"> · ';
            exceededLimit = track.artists.map(artist => artist.name).join(', ').length > 60;
            for (var i = 0; i < track.artists.length; i++) {
                var characters = 0;
                if (i != track.artists.length - 1) {
                    tr += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + track.artists[i].id + '">';
                    tr += track.artists[i].name + '</span>, ';
                    characters += track.artists[i].name.length;
                } else {
                    if (exceededLimit) {
                        tr += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + track.artists[i].id + '">';
                        tr += track.artists[i].name.substring(0, 30 - characters) + '</span>';
                    } else {
                        tr += '<span onclick="setupArtist(this);" class="artist-redirect" artist-id="' + track.artists[i].id + '">';
                        tr += track.artists[i].name + '</span>';
                    }
                }
            }
            tr += '</span></td><td>' + minutes(track.duration_ms) + '</td>';
            tr += '</tr>';
            $('#album-tbody').append(tr);
        });

        document.getElementById('delete-playlist').addEventListener('click', function(e) {
            deletePlaylist(album.uri, document.getElementById('playlist-info').getAttribute('playlist-type'));
        });

        mainDivider.scrollTo({ top: 0 });

        var current_id = document.getElementById('playlist-info').getAttribute('playlist-id');
        var last_id = document.getElementById('last-id').value;
        var shuffle = document.getElementById('shuffle');

        if (current_id == last_id) {
            document.getElementById('play-playlist').style.display = 'none';
            if (window.getComputedStyle(shuffle).color !== 'rgb(173, 136, 176)') {
                document.getElementById('shuffle-playlist').style.color = '#E8DAED';
            }
        }
        openPlaylistAlbum();
    });
}
</script>
