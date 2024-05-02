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
            url: 'https://api.spotify.com/v1/browse/new-releases?limit=20',
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
                    if (album.artists) {
                        html += '<h4>';
                        album.artists.forEach(function(artist) {
                            html += ' ' + artist.name;
                        });
                        html += '</h4>';
                    }
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
                        //console.log('Información del artista:', data);
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

    // Obtener el token de acceso y llamar a la función para imprimir los datos
    getAccessToken(function(accessToken) {
        printAlbums(accessToken);
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
                left: -250, // Ajusta la cantidad de desplazamiento según tus necesidades
                behavior: "smooth"
            });
        });

        scrollRight.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: 250, // Ajusta la cantidad de desplazamiento según tus necesidades
                behavior: "smooth"
            });
        });
    });

    function toggleScrollButtonsVisibility(mainContentDiv, scrollLeft, scrollRight) {
        if (mainContentDiv.scrollLeft > 0) {
            scrollLeft.style.opacity = 1;
        } else {
            scrollLeft.style.opacity = 0;
        }

        if (mainContentDiv.scrollLeft < (mainContentDiv.scrollWidth - mainContentDiv.clientWidth)) {
            scrollRight.style.opacity = 1;
        } else {
            scrollRight.style.opacity = 0;
        }
    }
});
