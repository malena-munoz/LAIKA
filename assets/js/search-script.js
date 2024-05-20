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

    if(searchTerm == '' || searchTerm == null) {
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
            var html = '<a href="#" class="track-a" data-name="' + track.name + '" data-artists="' + track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + (track.preview_url ? track.preview_url : '') + '"><div class="track">';
            if (track.album.images.length > 0) {
                html += '<img src="' + track.album.images[0].url + '" alt="' + track.name + '">';
            }
            html += '<h3>' + track.name + '</h3>';
            html += '<h4>';
            track.artists.forEach(function(artist, index) {
                html += artist.name;
                if (index < track.artists.length - 1) {
                    html += ', ';
                }
            });
            html += '</h4>';
            html += '</div></a>';
            searchedSongsContainer.innerHTML += html;
        });
    }

    // Mostrar álbumes
    const searchedAlbumsContainer = document.getElementById('searched-albums');
    searchedAlbumsContainer.innerHTML = '';
    if (albums.items.length > 0) {
        albums.items.forEach(album => {
            var html = '<a href="#" class="album-a" data-name="' + album.name + '"><div class="album">';
            if (album.images.length > 0) {
                html += '<img src="' + album.images[0].url + '" alt="' + album.name + '">';
            }
            html += '<h3>' + album.name + '</h3>';
            html += '</div></a>';
            searchedAlbumsContainer.innerHTML += html;
        });
    }

    // Mostrar artistas
    const searchedArtistsContainer = document.getElementById('searched-artists');
    searchedArtistsContainer.innerHTML = '';
    if (artists.items.length > 0) {
        artists.items.forEach(artist => {
            var html = '<a href="#"><div class="artist" style="background-image:linear-gradient(0deg, #00000088 30%, #ffffff44 100%), url(' + artist.images[0].url + ')">';
            html += '<h3>' + artist.name + '</h3>';
            html += '</div></a>';
            searchedArtistsContainer.innerHTML += html;
        });
    }
}
