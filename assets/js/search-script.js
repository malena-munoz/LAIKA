async function searchSpotify(event) {
    event.preventDefault();
    
    const searchTerm = document.getElementById('search-input').value;
    const clientId = '84f52098b74a42d3bce3277d27253875';
    const clientSecret = '56cd5c6c0f5e4e7c98db87172e03d54b';

    try {
        // Obtener token de acceso
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            },
            body: 'grant_type=client_credentials'
        });
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Realizar búsqueda en la API de Spotify
        const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track,artist,album`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        const searchData = await searchResponse.json();

        // Mostrar resultados y ocultar el contenido de home-real.php
        displaySearchResults(searchData);
        document.getElementById('search-results').style.display = 'block';
        document.getElementById('home-real').style.display = 'none';
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
    }

    if(searchTerm == '') {
        document.getElementById('search-results').style.display = 'none';
        document.getElementById('home-real').style.display = 'block';
    }
}

function displaySearchResults(data) {
    const { tracks, artists, albums } = data;

    // Mostrar canciones
    const searchedSongsContainer = document.getElementById('searched-songs');
    searchedSongsContainer.innerHTML = '';
    if (tracks.items.length > 0) {
        tracks.items.forEach(track => {
            console.log(track);
            var html = '<a href="#" class="card-a track-a" data-name="' + track.name + '" data-artists="' + track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.preview_url + '"><div class="card">';
            if (track.album.images.length > 0) {
                html += '<img src="' + track.album.images[0].url + '" alt="' + track.name + '">';
            }
            var trackName = track.name.length > 30 ? track.name.substring(0, 30) + '...' : track.name;
            html += '<h3>' + trackName + '</h3>';
            html += '<h4>';
            var artistName = (track.artists.map(artist => artist.name).join(', ').length > 30 ? 
                track.artists.map(artist => artist.name).join(', ').substring(0, 30) + '...' : 
                track.artists.map(artist => artist.name).join(', '));
            html += artistName + '</h4>';
            html += '</div></a>';
            searchedSongsContainer.innerHTML += html;
        });

        // Agregar el evento clic a cada elemento de canción
        $('.track-a').on('click', function(e) {
            e.preventDefault();
            var songName = $(this).data('name');
            var artists = $(this).data('artists');
            var previewUrl = $(this).data('preview');
            var imageUrl = $(this).find('img').attr('src'); // Get the image URL of the clicked song
            // Actualizar la información de la canción en el reproductor
            $('#playing-song-info h3').text(songName);
            $('#playing-song-info h4').text(artists);
            playing_song_audio.src = previewUrl;
            $('#img-current-song img').attr('src', imageUrl); // Update the image of the playing song
            playNewSong(); // Reproducir la canción automáticamente
        });
    }

    // Mostrar álbumes
    const searchedAlbumsContainer = document.getElementById('searched-albums');
    searchedAlbumsContainer.innerHTML = '';
    if (albums.items.length > 0) {
        albums.items.forEach(album => {
            var albumName = album.name.length > 50 ? album.name.substring(0, 50) + '...' : album.name;
            var html = '<a href="#" class="card-a" id="' + album.id + '" data-name="' + 
                albumName + '" onclick="setupAlbum(this);"><div class="card">';
            if (album.images.length > 0) {
                html += '<img src="' + album.images[0].url + '" alt="' + album.name + '">';
            }
            html += '<h3>' + albumName + '</h3>';
                html += '<h4>';
                album.artists.forEach(function(artist, index) {
                    html += artist.name;
                    if (index < album.artists.length - 1) {
                        html += ', ';
                    }
                });
                html += '</h4>';
                html += '</div></a>';
            searchedAlbumsContainer.innerHTML += html;
        });
    }
    

    // Mostrar artistas
    const searchedArtistsContainer = document.getElementById('searched-artists');
    searchedArtistsContainer.innerHTML = '';

    if (artists.items.length > 0) {
        artists.items.forEach(artist => {
            let imageUrl = artist.images.length > 0 ? artist.images[0].url : '';

            // Crear el contenedor del artista
            let artistDiv = document.createElement('div');
            artistDiv.className = 'artist';
            artistDiv.style.backgroundImage = imageUrl ? `linear-gradient(0deg, #00000088 30%, #ffffff44 100%), url(${imageUrl})` : '';
            artistDiv.style.backgroundColor = imageUrl ? '' : 'black';

            // Crear el nombre del artista
            let artistName = document.createElement('h3');
            artistName.textContent = artist.name;

            // Crear el enlace
            let link = document.createElement('a');
            link.href = '#';

            // Añadir el nombre al contenedor del artista
            artistDiv.appendChild(artistName);
            // Añadir el contenedor del artista al enlace
            link.appendChild(artistDiv);
            // Añadir el enlace al contenedor principal
            searchedArtistsContainer.appendChild(link);

            // Manejar el error de carga de la imagen
            if (imageUrl) {
                let img = new Image();
                img.src = imageUrl;
                img.onerror = () => {
                    artistDiv.style.backgroundImage = '';
                    artistDiv.style.backgroundColor = 'black';
                };
            }
        });
    }

}
