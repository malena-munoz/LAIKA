$(document).ready(function() {
    var clientId = 'c1f77d0fade2485f987f6454a201cab5';
    var clientSecret = '1c3bc66535484d90a934968f469d445a';

    // Función para obtener el token de acceso
    function getAccessToken(callback) {
        $.ajax({
            url: 'https://accounts.spotify.com/api/token',
            type: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            data: 'grant_type=client_credentials',
            success: function(response) {
                var accessToken = response.access_token;
                // console.log('Token de acceso obtenido:', accessToken);
                callback(accessToken);
            },
            error: function(err) {
                console.error('Error al obtener el token de acceso:', err);
            }
        });
    }

    // Función para imprimir los álbumes
    function printAlbums(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/browse/new-releases?limit=30',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Álbumes más populares:', data);
                var albums = data.albums.items;

                albums.forEach(function(album) {
                    var albumName = album.name.length > 50 ? album.name.substring(0, 50) + '...' : album.name;
                    var html = '<a href="#" class="album-a"><div class="album">';
                    if (album.images.length > 0) {
                        html += '<img src="' + album.images[0].url + '" alt="' + album.name + '">';
                    }
                    html += '<h3 alt='+albumName+'>' + albumName + '</h4>';
                    html += '<h4>';
                    album.artists.forEach(function(artist, index) {
                        html += artist.name;
                        if (index < album.artists.length - 1) {
                            html += ', ';
                        }
                    });
                    html += '</h4>';
                    html += '</div></a>';
                    $('#main-albums').append(html);
                });

                // Una vez que se imprimen los álbumes, buscamos información adicional sobre los artistas implicados
                searchArtists(accessToken, albums);
            },
            error: function(err) {
                console.error('Error al obtener los álbumes:', err);
            }
        });
    }

    // Función para imprimir las playlists más populares
    function printPlaylists(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/browse/featured-playlists?limit=6',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Playlists más populares:', data);
                var playlists = data.playlists.items;

                playlists.forEach(function(playlist) {
                    var html = '<a href="#" class="playlist-div-a"><div class="playlist-div">';
                    if (playlist.images.length > 0) {
                        html += '<img src="' + playlist.images[0].url + '">';
                    }
                    html += '<h3>' + playlist.name + '</h3>';
                    html += '<h4>' + playlist.description + '</h4>';
                    html += '</div></a>';
                    $('#main-playlists').append(html);
                });
            },
            error: function(err) {
                console.error('Error al obtener las playlists:', err);
            }
        });
    }
    // Función para imprimir las canciones de la playlist "Top 50"
    function printTop50(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Canciones del Top 50:', data);
                var tracks = data.items;

                tracks.forEach(function(track, index) {
                    var html = '<a href="#" class="track-a" data-name="' + track.track.name + '" data-artists="' + track.track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.track.preview_url + '"><div class="track">';
                    if (track.track.album.images.length > 0) {
                        html += '<img src="' + track.track.album.images[0].url + '" alt="' + track.track.name + '">';
                    }
                    html += '<h3>' + track.track.name + '</h3>';
                    html += '<h4>';
                    track.track.artists.forEach(function(artist, index) {
                        html += artist.name;
                        if (index < track.track.artists.length - 1) {
                            html += ', ';
                        }
                    });
                    html += '</h4>';
                    html += '</div></a>';
                    $('#top-50-songs').append(html);
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
                    changeSongStatus(); // Reproducir la canción automáticamente
                });
            },
            error: function(err) {
                console.error('Error al obtener las canciones del Top 50:', err);
            }
        });
    }

    // Función para buscar información adicional sobre los artistas implicados en los álbumes
    function searchArtists(accessToken, albums) {
        albums.forEach(function(album) {
            album.artists.forEach(function(artist) {
                $.ajax({
                    url: 'https://api.spotify.com/v1/artists/' + artist.id,
                    type: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    success: function(data) {
                        // console.log('Información del artista:', data);
                        var html = '<a href="#"><div class="artist" style="background-image:linear-gradient(0deg, #00000088 30%, #ffffff44 100%), url(' + data.images[0].url + ')">';
                        html += '<h3>' + data.name + '</h3>';
                        html += '</div></a>';
                        $('#main-artists').append(html);
                    },
                    error: function(err) {
                        console.error('Error al obtener información del artista:', err);
                    }
                });
            });
        });
    }

    // Obtener el token de acceso y llamar a las funciones para imprimir los datos
    getAccessToken(function(accessToken) {
        printAlbums(accessToken);
        printPlaylists(accessToken);
        printTop50(accessToken);
    });
});






// -----------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const scrollContainers = document.querySelectorAll(".scroll-container");

    scrollContainers.forEach(scrollContainer => {
        const scrollLeft = scrollContainer.querySelector(".scroll-left");
        const scrollRight = scrollContainer.querySelector(".scroll-right");
        const mainContentDiv = scrollContainer.querySelector("div");

        scrollContainer.addEventListener("mouseenter", function() {
            toggleScrollButtonsVisibility(mainContentDiv, scrollLeft, scrollRight);
        });

        scrollContainer.addEventListener("mouseleave", function() {
            toggleScrollButtonsVisibility(mainContentDiv, scrollLeft, scrollRight);
        });

        scrollLeft.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: -1500, // Ajusta la cantidad de desplazamiento según tus necesidades
                behavior: "smooth"
            });
        });

        scrollRight.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: 1500, // Ajusta la cantidad de desplazamiento según tus necesidades
                behavior: "smooth"
            });
        });
    });

    function toggleScrollButtonsVisibility(mainContentDiv, scrollLeft, scrollRight) {
        if (mainContentDiv.scrollLeft > 0) {
            scrollLeft.style.display = 'block';
        } else {
            scrollLeft.style.display = 'none';
        }
    
        if (mainContentDiv.scrollLeft < (mainContentDiv.scrollWidth - mainContentDiv.clientWidth)) {
            scrollRight.style.display = 'block';
        } else {
            scrollRight.style.display = 'none';
        }
    }
});






// -----------------------------------------------------------------------------------------------------------------------------------------

function obtenerSaludo() {
    var hora = new Date().getHours();
    var saludo;

    if (hora >= 7 && hora < 14) {
        saludo = "¡Buenos días!";
    } else if (hora >= 14 && hora < 20) {
        saludo = "¡Buenas tardes!";
    } else {
        saludo = "¡Buenas noches!";
    }

    return saludo;
}

// Obtener el elemento donde mostrar el saludo
var mensajeSaludo = document.getElementById("saludo"); // Ajusta el ID según tu HTML

// Mostrar el saludo
mensajeSaludo.textContent = obtenerSaludo();
