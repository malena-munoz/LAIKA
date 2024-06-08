<div class="main-content" id="user-display">
    <?php
    $idUsuario = $_SESSION['idUsuario'];
    $nombreUsuario = $_SESSION['nombreUsuario'];
    $emailUsuario = $_SESSION['emailUsuario'];
    $fotoUsuario = $_SESSION['fotoUsuario'];
    $fondoUsuario = $_SESSION['fondoUsuario'];
    $quoteUsuario = $_SESSION['quoteUsuario'];

    $srcFotoUsuario = isset($fotoUsuario) && !is_null($fotoUsuario) ? 'data:image/png;base64,' . $fotoUsuario : './assets/img/default-user.png';
    $srcFondoUsuario = isset($fondoUsuario) && !is_null($fondoUsuario) ? 'data:image/png;base64,' . $fondoUsuario : './assets/img/default-bg.png';
    ?>
    <div class="user-big-container">
        <img id="user-background" src="<?php echo htmlspecialchars($srcFondoUsuario); ?>" alt="">
    </div>
    <div class="user-main-container">
        <img id="user-portrait" src="<?php echo htmlspecialchars($srcFotoUsuario); ?>" alt="">
        <span id="user-name"><?php echo htmlspecialchars($nombreUsuario); ?></span>
    </div>
    <div class="user-note-container">
        <section class="user-note personal-note">
            <textarea id="user-quote"><?php echo htmlspecialchars($quoteUsuario); ?></textarea>
        </section>
    </div>
    <div class="user-note-container">
        <section class="user-note stats-note" style="display: none;">
            <div class="user-stats">
                <h4>Mi artista favorito es... </h4>
                <span id="artist-stats-user"></span>
            </div>
            <div class="user-stats">
                <h4>Soy fan de la canción... </h4>
                <span id="song-stats-user"></span>
            </div>
            <div class="user-stats">
                <h4>Normalmente escucho... </h4>
                <span id="genre-stats-user"></span>
            </div>
        </section>
    </div>
    <h3 style="margin-bottom: -15px;">Playlists</h3>
    <div id="user-playlist-container" class="scroll-container">
        <button id="albums-scroll-left" class="scroll-left" onclick="scrollLeft();">
            <span class="material-symbols-rounded">chevron_left</span>
        </button>
        <div id="main-user-playlists">
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
        </div>
        <button id="albums-scroll-right" class="scroll-right" onclick="scrollRight();">
            <span class="material-symbols-rounded">chevron_right</span>
        </button>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        loadUserPlaylists();

        function loadUserPlaylists() {
            fetch('./controller/get_user_playlists.php')
                .then(response => response.json())
                .then(playlists => {
                    var container = document.getElementById('main-user-playlists');
                    
                    playlists.forEach(playlist => {
                        var html = '<a href="#" class="card-a" data-id="' + playlist.id_playlist;
                        if(playlist.editable == 0){
                            document.querySelectorAll('.spotify-playlist-item').forEach(item => {
                                var uri = item.getAttribute('data-uri');
                                if(uri === playlist.link_playlist){
                                    var link = uri.split(':');
                                    if(link[1]==='album'){
                                        html +='" id="' + uri.split(':')[2] +'" onclick="setupAlbum(this);"><div class="card">';
                                        returnAccessToken()
                                        .then(function(accessToken) {
                                            return getAlbum(link[2], accessToken);
                                        })
                                        .then(function(album) {
                                            html += '<img src="' + album.images[0].url + '">';
                                            html += '<h3>' + album.name + '</h3><h4>';
                                            var exceededLimit = album.artists.map(artist => artist.name).join(', ').length > 30;
                                            for(var i=0; i<album.artists.length; i++){
                                                var characters = 0;
                                                if(i != album.artists.length-1){
                                                    html += '<span class="artist-redirect" artist-id="' + album.artists[i].id + '">';
                                                    html += album.artists[i].name + '</span>, ';
                                                    characters += album.artists[i].name.length;
                                                }else{
                                                    if(exceededLimit){
                                                        html += '<span class="artist-redirect" artist-id="' + album.artists[i].id + '">';
                                                        html += album.artists[i].name.substring(0, 30-characters) + '</span>';
                                                    }else{
                                                        html += '<span class="artist-redirect" artist-id="' + album.artists[i].id + '">';
                                                        html += album.artists[i].name + '</span>';
                                                    }
                                                }
                                            }
                                            html += '</div></a>';
                                            container.insertAdjacentHTML('beforeend', html);
                                        })
                                        .catch(function(err) {
                                            console.error('Error:', err);
                                        });
                                    }else{
                                        html +='" id="' + uri.split(':')[2] +'" onclick="setupPlaylist(this);"><div class="card">';
                                        returnAccessToken()
                                        .then(function(accessToken) {
                                            return getPlaylist(link[2], accessToken);
                                        })
                                        .then(function(playlist) {
                                            html += '<img src="' + playlist.images[0].url + '">';
                                            html += '<h3>' + (playlist.name.length !=0 ? playlist.name : ' ') + '</h3>';
                                            html += '<h4>' + (playlist.owner.display_name.length > 30 ? 
                                            playlist.owner.display_name.substring(0, 30) + '...' : playlist.owner.display_name) + '</h4>';
                                            html += '</div></a>';
                                            container.insertAdjacentHTML('beforeend', html);
                                        })
                                        .catch(function(err) {
                                            console.error('Error:', err);
                                        });
                                    }
                                }
                            });
                        }else{
                            html +='" onclick="setupPlaylistUserProfile(this);"><div class="card">';
                            if (playlist.foto_playlist) {
                                html += '<img src="' + playlist.foto_playlist + '">';
                            } else {
                                html += '<img src="./assets/img/default-song.png">';
                            }
                            html += '<h3>' + ((playlist.nombre_playlist === null) ? 'Sin Nombre' : playlist.nombre_playlist) + '</h3>';
                            html += '<h4><?php echo htmlspecialchars($nombreUsuario); ?></h4>';
                            html += '</div></a>';
                            container.insertAdjacentHTML('beforeend', html);
                        }
    
                    });
                })
                .catch(err => console.error('Error loading playlists:', err));
        }
    });

    async function setupPlaylistUserProfile(playlistCard) {
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

                if (playlist.editable == 1) {
                    var html = '<div class="main-content" id="playlist-display" style="display: flex">' +
                        '<div id="playlist-info" playlist-id="' + id +'"><section>' +
                        '<input id="playlist-name" type="text" value="' + playlistName + '" /><div id="playlist-owner">';
                    html += '<span id="owner-name">' + playlist.owner + '</span></div><div id="playlist-controls">';
                    html += '<span class="material-symbols-rounded" id="play-playlist" onclick="changePlaylistControlStyle(\'play-playlist\'); addPlaylist(); playAtIndex(0);">play_arrow</span>';
                    html += '<span class="material-symbols-rounded" id="shuffle-playlist" onclick="shuffleBegin(\'playlist\');">shuffle</span>';
                    html += '</div></section><div id="playlist-img-container" style="background-image: url(\'' + playlistImage + '\');width: 300px;height: 300px;object-fit: cover;object-position: top;border-left: 5px solid var(--mid-lilac);border-top: 5px solid var(--mid-lilac);border-right: 5px solid var(--mid-lilac);border-top-right-radius: 5px;border-top-left-radius: 5px;background-size: cover;background-repeat: no-repeat;background-position: center center;"><input type="file" id="playlist-img-upload" accept=".png, .gif, .jpg" style="display: none;"></div></div>';
                    html += '<div id="song-list"><table class="playlist-table"><thead><tr>';
                    html += '<th>#</th><th>Canción</th><th>Álbum</th><th><span class="material-symbols-rounded">timer</span></th></tr></thead>';
                    html += '<tbody id="playlist-tbody"></tbody></table></div></div>';

                }else {
                    var html = '<div class="main-content" id="playlist-display" style="display: flex">' +
                        '<div id="playlist-info" playlist-id="' + id +'"><section>' +
                        '<span id="playlist-name"/>' + playlistName + '</span><div id="playlist-owner">';
                    html += '<span id="owner-name">' + playlist.owner + '</span></div><div id="playlist-controls">';
                    html += '<span class="material-symbols-rounded" id="play-playlist" onclick="changePlaylistControlStyle(\'play-playlist\'); addPlaylist(); playAtIndex(0);">play_arrow</span>';
                    html += '<span class="material-symbols-rounded" id="shuffle-playlist" onclick="shuffleBegin(\'playlist\');">shuffle</span>';
                    html += '</div></section><div id="playlist-img-container" style="background-image: url(\'' + playlistImage + '\');width: 300px;height: 300px;object-fit: cover;object-position: top;border-left: 5px solid var(--mid-lilac);border-top: 5px solid var(--mid-lilac);border-right: 5px solid var(--mid-lilac);border-top-right-radius: 5px;border-top-left-radius: 5px;background-size: cover;background-repeat: no-repeat;background-position: center center;"></div></div>';
                    html += '<div id="song-list"><table class="playlist-table"><thead><tr>';
                    html += '<th>#</th><th>Canción</th><th>Álbum</th><th><span class="material-symbols-rounded">timer</span></th></tr></thead>';
                    html += '<tbody id="playlist-tbody"></tbody></table></div></div>';

                }

                $('#search-results').after(html);

                // Buscar canciones en la API de Spotify
                var tracks = playlist.tracks;
                var index = 1;
                tracks.forEach(async track => {
                    try {
                        var songData = await fetchSpotifyTrack(track.nombre_cancion, track.artista_cancion);
                        var tr = '<tr onclick="playSongPlaylist(this);" onmouseover="hoverRowIn(this);" onmouseout="hoverRowOut(this);">';
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
                        returnAccessToken()
                            .then(function(accessToken) {
                                return getTrack(songData.id, accessToken);
                            })
                            .then(function(track) {
                                console.log(track);
                                tr += '<td><span onclick="setupAlbum(this);" class="artist-redirect" id="' + track.album.id + '">' + track.album.name + '</span></td>';
                                tr += '<td>' + minutes(songData.duration_ms) + '</td>';
                                tr += '</tr>';
                                $('#playlist-tbody').append(tr);
                            })
                            .catch(function(err) {
                                console.error('Error:', err);
                            });
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
</script>