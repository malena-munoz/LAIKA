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
        const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track,artist,album,playlist`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        });
        const searchData = await searchResponse.json();

        // Mostrar resultados y ocultar el contenido de home-real.php
        displaySearchResults(searchData);
        displaySearch(true);
    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
    }

    if (searchTerm == '') {
        displaySearch(false);
    }
}

function displaySearchResults(data) {
    const { tracks, artists, albums, playlists } = data;

    // Mostrar canciones
    const searchedSongsContainer = document.getElementById('searched-songs');
    searchedSongsContainer.innerHTML = '';
    if (tracks.items.length > 0) {
        tracks.items.forEach(track => {
            let html = '<a onclick="playCard(this);" href="#" class="card-a track-a" data-name="' + track.name + '" data-artists="' + track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.preview_url + '"><div class="card">';
            if (track.album.images.length > 0) {
                html += '<img src="' + track.album.images[0].url + '" alt="' + track.name + '">';
            }
            let trackName = track.name.length > 30 ? track.name.substring(0, 30) + '...' : track.name;
            html += '<h3>' + trackName + '</h3><h4>';
            var exceededLimit = track.artists.map(artist => artist.name).join(', ').length > 30;
            for(var i=0; i<track.artists.length; i++){
                var characters = 0;
                if(i != track.artists.length-1){
                    html += '<span class="artist-redirect" artist-id="' + track.artists[i].id + '">';
                    html += track.artists[i].name + '</span>, ';
                    characters += track.artists[i].name.length;
                }else{
                    if(exceededLimit){
                        html += '<span class="artist-redirect" artist-id="' + track.artists[i].id + '">';
                        html += track.artists[i].name.substring(0, 30-characters) + '</span>';
                    }else{
                        html += '<span class="artist-redirect" artist-id="' + track.artists[i].id + '">';
                        html += track.artists[i].name + '</span>';
                    }
                }
            }
            html += '</h4></div></a>';
            searchedSongsContainer.innerHTML += html;
        });
    }

    // Mostrar álbumes
    const searchedAlbumsContainer = document.getElementById('searched-albums');
    searchedAlbumsContainer.innerHTML = '';
    if (albums.items.length > 0) {
        albums.items.forEach(album => {
            let albumName = album.name.length > 50 ? album.name.substring(0, 50) + '...' : album.name;
            let html = '<a href="#" class="card-a" id="' + album.id + '" data-name="' + albumName + '" onclick="setupAlbum(this);"><div class="card">';
            if (album.images.length > 0) {
                html += '<img src="' + album.images[0].url + '" alt="' + album.name + '">';
            }
            html += '<h3>' + albumName + '</h3><h4>';

            var exceededLimit = album.artists.map(artist => artist.name).join(', ').length > 30;
            for(var i=0; i<album.artists.length; i++){
                var characters = 0;
                if(i != album.artists.length-1){
                    html += '<span class="artist-redirect" artist-id="' + album.artists[i].id + '">';
                    html += album.artists[i].name + '</span>, ';
                    characters += album.artists[i].name.length;
                }else{
                    if(exceededLimit){
                        html += '<span class="artist-redirect" artist-id="' + album.artistss[i].id + '">';
                        html += album.artists[i].name.substring(0, 30-characters) + '</span>';
                    }else{
                        html += '<span class="artist-redirect" artist-id="' + album.artists[i].id + '">';
                        html += album.artists[i].name + '</span>';
                    }
                }
            }
            html += '</h4></div></a>';
            html += '</h4></div></a>';
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
            link.setAttribute('artist-id', artist.id);
            link.setAttribute('onclick', 'setupArtist(this);');

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

    // Mostrar playlists
    const searchedPlaylistsContainer = document.getElementById('searched-playlists');
    searchedPlaylistsContainer.innerHTML = '';
    if (playlists.items.length > 0) {
        playlists.items.forEach(playlist => {
            if (!playlist.owner.display_name.toLowerCase().includes('spotify')) { // Filtrar playlists creadas por Spotify
                let playlistName = playlist.name.length > 50 ? playlist.name.substring(0, 50) + '...' : playlist.name;
                let html = '<a href="#" class="card-a" id="' + playlist.id + '" data-name="' + playlistName + '" onclick="setupPlaylist(this);"><div class="card">';
                if (playlist.images.length > 0) {
                    html += '<img src="' + playlist.images[0].url + '" alt="' + playlist.name + '">';
                }
                html += '<h3>' + playlistName + '</h3>';
                html += '<h4>';
                playlist.owner.display_name ? html += playlist.owner.display_name : html += 'Desconocido';
                html += '</h4>';
                html += '</div></a>';
                searchedPlaylistsContainer.innerHTML += html;
            }
        });
    }
}