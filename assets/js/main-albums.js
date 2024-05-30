// Géneros musicales, disponibles en Spotify
const genres = [
    "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"
];

var clientId = 'c1f77d0fade2485f987f6454a201cab5';
var clientSecret = '1c3bc66535484d90a934968f469d445a';


$(document).ready(function() {

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

    function getArtistId(accessToken, artistName, callback) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: {
                q: artistName,
                type: 'artist',
                limit: 1
            },
            success: function(response) {
                if (response.artists.items.length > 0) {
                    callback(response.artists.items[0].id);
                } else {
                    console.error('No se encontró el artista:', artistName);
                    callback(null);
                }
            },
            error: function(err) {
                console.error('Error al buscar el artista:', err);
                callback(null);
            }
        });
    }

    function printAlbums(accessToken, topArtists) {
        if (!topArtists.length) {
            printGeneralAlbums(accessToken);
            return;
        }
    
        let allAlbums = [];
    
        // Función para mezclar un array
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    
        // Función para mostrar los álbumes
        function displayAlbums(albums) {
            albums.forEach(function(album) {
                var albumName = album.name.length > 50 ? album.name.substring(0, 50) + '...' : album.name;
                var html = '<a href="#" class="card-a" id="' + album.id + '" onclick="setupAlbum(this);"><div class="card">';
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
                $('#main-albums').append(html);
            });
        }
    
        // Contador para asegurarnos de que todas las solicitudes AJAX hayan terminado
        let remainingArtists = topArtists.length;
    
        topArtists.forEach(function(artistName) {
            getArtistId(accessToken, artistName, function(artistId) {
                if (artistId) {
                    $.ajax({
                        url: 'https://api.spotify.com/v1/artists/' + artistId + '/albums?limit=5',
                        type: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function(data) {
                            allAlbums = allAlbums.concat(data.items);
    
                            // Reducir el contador
                            remainingArtists--;
    
                            // Si es el último artista, mezclar y mostrar los álbumes
                            if (remainingArtists === 0) {
                                shuffle(allAlbums);
                                displayAlbums(allAlbums);
                            }
                        },
                        error: function(err) {
                            console.error('Error al obtener los álbumes:', err);
    
                            // Reducir el contador aunque haya un error
                            remainingArtists--;
    
                            // Si es el último artista, mezclar y mostrar los álbumes
                            if (remainingArtists === 0) {
                                shuffle(allAlbums);
                                displayAlbums(allAlbums);
                            }
                        }
                    });
                } else {
                    // Reducir el contador si no se encuentra el ID del artista
                    remainingArtists--;
    
                    // Si es el último artista, mezclar y mostrar los álbumes
                    if (remainingArtists === 0) {
                        shuffle(allAlbums);
                        displayAlbums(allAlbums);
                    }
                }
            });
        });
    }    

    function printGeneralAlbums(accessToken) {
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
                    var html = '<a href="#" class="card-a" id="' + album.id + '" onclick="setupAlbum(this);"><div class="card">';
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

    // Función para imprimir las playlists más populares de Spotify
    function printPlaylists(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/browse/featured-playlists?limit=30',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Playlists más populares:', data);
                var playlists = data.playlists.items;

                playlists.forEach(function(playlist) {
                    var html = '<a href="#" class="card-a" id="' + playlist.id +'" onclick="setupPlaylist(this);"><div class="card">';
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

    function printTop50(accessToken, topArtists) {
        if (!topArtists.length) {
            printGeneralTop50(accessToken);
            return;
        }
    
        let trackCount = 0;
        let sectionCount = 0;
        let $currentSection;
    
        topArtists.forEach(function(artistName) {
            getArtistId(accessToken, artistName, function(artistId) {
                if (artistId) {
                    $.ajax({
                        url: 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?market=ES',
                        type: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function(data) {
                            var tracks = data.tracks;
                            tracks.forEach(function(track) {
                                if (trackCount >= 100) return;  // Limita las canciones a 100

                                if (trackCount % 50 === 0) {
                                    sectionCount++;
                                    $currentSection = $('<section id="section-top-' + sectionCount + '"></section>');
                                    $('#top-50-songs').append($currentSection);
                                }
                                trackCount++;
                                
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
                                $currentSection.append(html);
                            });
                        },
                        error: function(err) {
                            console.error('Error al obtener las canciones del Top 50:', err);
                        }
                    });
                }
            });
        });
    }    

    function printGeneralTop50(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Canciones del Top 50:', data);
                var tracks = data.items;
                var $top50Songs = $('#top-50-songs');
                var sectionCount = 0;
                var $currentSection;

                tracks.forEach(function(track, index) {
                    // Crear una nueva sección cada 25 tracks
                    if (index % 25 === 0) {
                        sectionCount++;
                        $currentSection = $('<section id="section-' + sectionCount + '"></section>');
                        $top50Songs.append($currentSection);
                    }
                    var html = '<a href="#" class="card-a track-a" data-name="' + track.track.name + '" data-artists="' + track.track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.track.preview_url + '"><div class="card">';
                    if (track.track.album.images.length > 0) {
                        html += '<img src="' + track.track.album.images[0].url + '" alt="' + track.track.name + '">';
                    }
                    var trackName = track.track.name.length > 30 ? track.track.name.substring(0, 30) + '...' : track.track.name;
                    html += '<h3>' + trackName + '</h3>';
                    html += '<h4>';
                    var artistName = (track.track.artists.map(artist => artist.name).join(', ').length > 30 ? 
                        track.track.artists.map(artist => artist.name).join(', ').substring(0, 30) + '...' : 
                        track.track.artists.map(artist => artist.name).join(', '));
                    html += artistName + '</h4>';
                    html += '</div></a>';
                    $currentSection.append(html);
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
            },
            error: function(err) {
                console.error('Error al obtener las canciones del Top 50:', err);
            }
        }); 
    }

    function printViral50(accessToken, topGenres) {
        if (!topGenres) {
            printGeneralViral50(accessToken);
            return;
        }
    
        var sectionCount = 0;
        var trackCount = 0;
        var $currentSection = $('<section id="viral-50-section-' + sectionCount + '"></section>');
        $('#viral-50-songs').append($currentSection);
    
        topGenres.forEach(function(genre) {
            $.ajax({
                url: 'https://api.spotify.com/v1/search?q=genre:' + genre + '&type=track',
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                success: function(data) {
                    var tracks = data.tracks.items;
                    tracks.forEach(function(track) {
                        if (trackCount >= 100) return;  // Limita las canciones a 100

                        if (trackCount % 50 === 0 && trackCount !== 0) {
                            sectionCount++;
                            $currentSection = $('<section id="viral-50-section-' + sectionCount + '"></section>');
                            $('#viral-50-songs').append($currentSection);
                        }
    
                        var html = '<a href="#" class="card-a track-a" data-name="' + track.name + '" data-artists="' + track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.preview_url + '"><div class="card">';
                        if (track.album.images.length > 0) {
                            html += '<img src="' + track.album.images[0].url + '" alt="' + track.name + '">';
                        }
                        var trackName = track.name.length > 30 ? track.name.substring(0, 30) + '...' : track.name;
                        html += '<h3>' + trackName + '</h3>';
                        html += '<h4>';
                        var artistName = track.artists.map(artist => artist.name).join(', ');
                        artistName = artistName.length > 30 ? artistName.substring(0, 30) + '...' : artistName;
                        html += artistName + '</h4>';
                        html += '</div></a>';
    
                        $currentSection.append(html);
                        trackCount++;
                    });
                },
                error: function(err) {
                    console.error('Error al obtener las canciones del Viral 50:', err);
                }
            });
        });
    }    

    function printGeneralViral50(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbLiRSasKsNU9/tracks',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Canciones del Viral 50:', data);
                var tracks = data.items;
                var $viral50Songs = $('#viral-50-songs');
                var sectionCount = 0;
                var $currentSection;

                tracks.forEach(function(track, index) {
                    // Crear una nueva sección cada 25 tracks
                    if (index % 25 === 0) {
                        sectionCount++;
                        $currentSection = $('<section id="section-' + sectionCount + '"></section>');
                        $viral50Songs.append($currentSection);
                    }
                    var html = '<a href="#" class="card-a track-a" data-name="' + track.track.name + '" data-artists="' + track.track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.track.preview_url + '"><div class="card">';
                    if (track.track.album.images.length > 0) {
                        html += '<img src="' + track.track.album.images[0].url + '" alt="' + track.track.name + '">';
                    }
                    var trackName = track.track.name.length > 30 ? track.track.name.substring(0, 30) + '...' : track.track.name;
                    html += '<h3>' + trackName + '</h3>';
                    html += '<h4>';
                    var artistName = track.track.artists.map(artist => artist.name).join(', ');
                    artistName = artistName.length > 30 ? artistName.substring(0, 30) + '...' : artistName;
                    html += artistName + '</h4>';
                    html += '</div></a>';
                    $currentSection.append(html);
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
            },
            error: function(err) {
                console.error('Error al obtener las canciones del Viral 50:', err);
            }
        }); 
    }

    // Función para buscar información adicional sobre los artistas implicados en los álbumes
    function searchArtists(accessToken, albums) {
        var artistIds = new Set();

        albums.forEach(function(album) {
            album.artists.forEach(function(artist) {
                if (!artistIds.has(artist.id)) {
                    artistIds.add(artist.id);
                    $.ajax({
                        url: 'https://api.spotify.com/v1/artists/' + artist.id,
                        type: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        },
                        success: function(data) {
                            var html = '<a href="#" artist-id="' + artist.id + '"><div class="artist" style="background-image:linear-gradient(0deg, #00000088 30%, #ffffff44 100%), url(' + data.images[0].url + ')">';
                            html += '<h3>' + data.name + '</h3>';
                            html += '</div></a>';
                            $('#main-artists').append(html);
                        },
                        error: function(err) {
                            console.error('Error al obtener información del artista:', err);
                        }
                    });
                }
            });
        });
    }

    // Función para imprimir los artistas
    function printArtists(accessToken, topArtists) {
        var artistIds = new Set();

        topArtists.forEach(function(artist) {
            $.ajax({
                url: 'https://api.spotify.com/v1/search',
                type: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                data: {
                    q: artist,
                    type: 'artist',
                    limit: 1
                },
                success: function(data) {
                    var artistData = data.artists.items[0];
                    if (!artistIds.has(artistData.id)) {
                        artistIds.add(artistData.id);
                        var html = '<a href="#" artist-id="' + artistData.id + '"><div class="artist" style="background-image:linear-gradient(0deg, #00000088 30%, #ffffff44 100%), url(' + artistData.images[0].url + ')">';
                        html += '<h3>' + artistData.name + '</h3>';
                        html += '</div></a>';
                        $('#main-artists').append(html);
                    }
                },
                error: function(err) {
                    console.error('Error al obtener información del artista:', err);
                }
            });
        });
    }

    // Devuele una canción aleatoria de la API
    function printRandomSong(accessToken) {
        const randomOffset = Math.floor(Math.random() * 1000);
        $.ajax({
            url: 'https://api.spotify.com/v1/search?q=year:2023&type=track&limit=1&offset=' + randomOffset,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                if (data.tracks.items.length > 0) {
                    var track = data.tracks.items[0];
                    
                    var html = '<a href="#" class="big-card-a track-a" data-name="' + track.name + '" data-artists="' + track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.preview_url + '" song-id="' + track.id + '">';
                    html += '<div class="big-card">';
                    html += '<img src="' + (track.album.images[0] ? track.album.images[0].url : '') + '">';
                    html += '<section><h3>...una canción?</h3>';
                    html += '<h3>' + (track.name.length > 40 ? track.name.substring(0, 40) + '...' : track.name)+ '</h3>';
                    html += '<h4>';
                    html += (track.artists.map(artist => artist.name).join(', ').length > 30 ? 
                        track.artists.map(artist => artist.name).join(', ').substring(0, 30) + '...' : 
                        track.artists.map(artist => artist.name).join(', '));
                    html += '</h4></section></div></a>';
                    
                    $('#random-container').append(html);
    
                    // Agregar el evento clic a cada elemento de canción
                    $('.track-a').on('click', function(e) {
                        e.preventDefault();
                        var songName = $(this).data('name');
                        var artists = $(this).data('artists');
                        var previewUrl = $(this).data('preview');
                        var imageUrl = $(this).find('img').attr('src'); // Obtener la URL de la imagen de la canción clicada
                        
                        // Actualizar la información de la canción en el reproductor
                        $('#playing-song-info h3').text(songName);
                        $('#playing-song-info h4').text(artists);
                        playing_song_audio.src = previewUrl;
                        $('#img-current-song img').attr('src', imageUrl); // Actualizar la imagen de la canción en reproducción
                        playNewSong(); // Reproducir la canción automáticamente
                    });
                } else {
                    console.error('No se encontró ninguna canción.');
                }
            },
            error: function(err) {
                console.error('Error al obtener la canción aleatoria:', err);
            }
        });
    }

    // Devuelve un género aleatorio
    function printRandomArtist(accessToken) {
        const randomGenre = genres[Math.floor(Math.random() * genres.length)];
        $.ajax({
            url: 'https://api.spotify.com/v1/search?q=genre:' + randomGenre + '&type=artist&limit=50',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                const artists = data.artists.items;
                const randomArtist = artists[Math.floor(Math.random() * artists.length)];

                // Crear los elementos del artista
                let link = document.createElement('a');
                link.href = '#';
                link.className = 'big-card-a';
                link.setAttribute('artist-id', randomArtist.id);

                let bigCardDiv = document.createElement('div');
                bigCardDiv.className = 'big-card';

                // Manejo de la imagen
                let img = new Image();
                if (randomArtist.images.length > 0) {
                    img.src = randomArtist.images[0].url;
                }
                img.onerror = function() {
                    bigCardDiv.style.backgroundColor = 'black';
                };

                let section = document.createElement('section');

                let h3_1 = document.createElement('h3');
                h3_1.textContent = '...un artista?';

                let h3_2 = document.createElement('h3');
                h3_2.textContent = randomArtist.name;

                let h4 = document.createElement('h4');
                h4.textContent = randomArtist.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' seguidores';

                // Ensamblar los elementos
                section.appendChild(h3_1);
                section.appendChild(h3_2);
                section.appendChild(h4);

                bigCardDiv.appendChild(img);
                bigCardDiv.appendChild(section);

                link.appendChild(bigCardDiv);

                // Añadir el enlace al contenedor principal
                document.getElementById('random-container').appendChild(link);

                // Comprobar si la imagen se ha cargado
                if (randomArtist.images.length === 0) {
                    bigCardDiv.style.backgroundColor = 'black';
                }
            },
            error: function(err) {
                console.error('Error al obtener el artista aleatorio 1:', err);
            }
        });
    }

    // Devuele un género aleatorio
    function printRandomPlaylist(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search?q=playlist&type=playlist&limit=50',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                var playlists = data.playlists.items;
                // Indice aleatorio 
                var randomIndex = Math.floor(Math.random() * playlists.length);
                // Playlist aleatoria
                var randomPlaylist = playlists[randomIndex]; 

                var html = '<a href="#" class="big-card-a" id="' + randomPlaylist.id + '" onclick="setupPlaylist(this);">';
                html += '<div class="big-card">';
                html += '<img src="' + randomPlaylist.images[0].url + '">';
                html += '<section><h3>...una playlist?</h3><h3>' + (randomPlaylist.name.length > 40 ? randomPlaylist.name.substring(0, 40) + '...' : randomPlaylist.name) + '</h3>';
                html += '<h4>'+ (randomPlaylist.owner.display_name.length > 30 ? randomPlaylist.owner.display_name.substring(0, 30) + '...' : randomPlaylist.owner.display_name) + '</h4></section></div></a>';

                $('#random-container').append(html);
            },
            error: function(err) {
                console.error('Error al obtener la playlist aleatoria 2:', err);
            }
        });
    }

    // Función para obtener las estadísticas del usuario
    function getUserStats(callback) {
        $.ajax({
            url: './view/get_user_statistics.php', // Reemplaza con la ruta correcta a tu script PHP
            type: 'GET',
            success: function(response) {
                callback(JSON.parse(response));
            },
            error: function(err) {
                console.error('Error al obtener las estadísticas del usuario:', err);
            }
        });
    }

    // Verificar si el usuario está logueado y tiene estadísticas
    getUserStats(function(userStats) {
        if (userStats.loggedin) {
            if (userStats.topArtists || userStats.topGenres) {
                getAccessToken(function(accessToken) {
                    // Ejecutar el código modificado para mostrar álbumes de artistas más escuchados
                    printAlbums(accessToken, userStats.topArtists);
                    printArtists(accessToken, userStats.topArtists);
                    printPlaylists(accessToken);
                    // Ejecutar el código modificado para mostrar canciones del Top 50 de artistas más escuchados
                    printTop50(accessToken, userStats.topArtists);
                    // Ejecutar el código modificado para mostrar canciones del género más escuchado
                    printViral50(accessToken, userStats.topGenres);
                    printRandomSong(accessToken);
                    printRandomArtist(accessToken);
                    printRandomPlaylist(accessToken);
                });
            }else{
                getAccessToken(function(accessToken) {
                    printGeneralAlbums(accessToken);
                    printPlaylists(accessToken);
                    printGeneralTop50(accessToken);
                    printGeneralViral50(accessToken);
                    printRandomSong(accessToken);
                    printRandomArtist(accessToken);
                    printRandomPlaylist(accessToken);
                });
            }
        } else {
            getAccessToken(function(accessToken) {
                printGeneralAlbums(accessToken);
                printPlaylists(accessToken);
                printGeneralTop50(accessToken);
                printGeneralViral50(accessToken);
                printRandomSong(accessToken);
                printRandomArtist(accessToken);
                printRandomPlaylist(accessToken);
            });
        }
    });
});




 // Devuelve el token de acceso (sin callback)
function returnAccessToken() {
    return new Promise(function(resolve, reject) {
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
                resolve(accessToken);
            },
            error: function(err) {
                console.error('Error al obtener el token de acceso:', err);
                reject(err);
            }
        });
    });
}

// Función para obtener una playlist
function getPlaylist(playlistId, accessToken) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'https://api.spotify.com/v1/playlists/' + playlistId,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                resolve(response);
            },
            error: function(err) {
                console.error('Error al obtener la playlist:', err);
                reject(err);
            }
        });
    });
}

// Función para obtener un álbum
function getAlbum(albumId, accessToken) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'https://api.spotify.com/v1/albums/' + albumId,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(response) {
                resolve(response);
            },
            error: function(err) {
                console.error('Error al obtener el álbum:', err);
                reject(err);
            }
        });
    });
}

// Función que, al hacer clic en una playlist, aparece una página con las canciones que la compone
function setupPlaylist(playlistCard) {
    // ID de la playlist
    var id = playlistCard.getAttribute('id');
    /// Contenedor primario de toda la página
    var mainDivider = document.getElementById('main-divider');
    returnAccessToken()
        .then(function(accessToken) {
            return getPlaylist(id, accessToken);
        })
        .then(function(playlist) {
            $(document).ready(function() {
                // Display del contenedor principal
                $('#home-real').css({'display': 'none'});

                var html = '<div class="main-content" id="playlist-display" style="display: flex">' +
                    '<div id="playlist-info" playlist-id="' + playlist.id +'"><section>' +
                    '<span id="playlist-name">' + (playlist.name.length > 25 ? playlist.name.substring(0, 25) + '...' : playlist.name) + '</span>';
                html += '<div id="playlist-owner"><img id="owner-img" src="' +  playlist.images[0].url + '" alt="' +playlist.owner.display_name + '">';
                html += '<span id="owner-name">' + playlist.owner.display_name + '</span></div><div id="playlist-controls">';
                html += '<span class="material-symbols-rounded" id="play-playlist" onclick="changePlaylistControlStyle(\'play-playlist\'); addPlaylist(); playAtIndex(0);">play_arrow</span>';
                html += '<span class="material-symbols-rounded" id="shuffle-playlist" onclick="shuffleBegin(\'playlist\');">shuffle</span>';
                html += '<span class="material-symbols-rounded" id="add-playlist" onclick="changePlaylistControlStyle(\'add-playlist\');">add</span>';
                html += '</div></section><img id="playlist-img" src="' + playlist.images[0].url + '" alt="' + playlist.name + '"></div>';
                html += '<div id="song-list"><div id="song-list"><table class="playlist-table"><thead><tr>';
                html += '<th>#</th><th>Canción</th><th>Álbum</th><th><span class="material-symbols-rounded">timer</span></th></tr></thead>';
                html += '<tbody id="playlist-tbody"></tbody></table></div></div>';

                $('#search-results').after(html);

                // Canciones de la playlist
                var tracks = playlist.tracks.items;
                var index = 1;
                tracks.forEach(track => {
                    var tr = '<tr ondblclick="playSongPlaylist(this);" onmouseover="hoverRowIn(this);" onmouseout="hoverRowOut(this);">';
                    tr += '<td song-id="' + track.track.id + '" preview-url="' + track.track.preview_url + '">' + (index++) + '</td>';
                    tr += '<td>' + '<img class="song-playlist-img" src="' + track.track.album.images[0].url + '" alt="Playlist-Img"/>' +
                        '<section>' + '<span class="playlist-song-title">' + track.track.name + '</span>' +
                        '<span class="playlist-song-artist">' + track.track.artists.map(artist => artist.name).join(', ') + '</span>' +
                        '</section>' + '</td>';
                    tr += '<td>' + track.track.album.name + '</td>';
                    tr += '<td>' + minutes(track.track.duration_ms) + '</td>';
                    tr += '</tr>';
                    // Carga la fila en el tbody
                    $('#playlist-tbody').append(tr);
                });
                // Una vez termine todo, el scroll vuelve arriba del todo
                mainDivider.scrollTo({
                    top: 0
                });

                var current_id = document.getElementById('playlist-info').getAttribute('playlist-id');
                var last_id = document.getElementById('last-id').value;
                var shuffle = document.getElementById('shuffle');

                if(current_id == last_id){
                    document.getElementById('play-playlist').style.display = 'none';
                    if(window.getComputedStyle(shuffle).color!=='rgb(173, 136, 176)'){
                        document.getElementById('shuffle-playlist').style.color = '#E8DAED';
                    }
                }
            });
        })
        .catch(function(err) {
            console.error('Error:', err);
        });
}

// Función que, al hacer clic en una playlist, aparece una página con las canciones que la compone
function setupAlbum(albumCard) {
    // ID de la playlist
    var id = albumCard.getAttribute('id');
    // Contenedor primario de toda la página
    var mainDivider = document.getElementById('main-divider');
    returnAccessToken()
        .then(function(accessToken) {
            return getAlbum(id, accessToken);
        })
        .then(function(album) {
            $(document).ready(function() {
                // Display del contenedor principal
                $('#home-real').css({'display': 'none'});

                var html = '<div class="main-content" id="playlist-display" style="display: flex">' +
                    '<div id="playlist-info" playlist-id="' + album.id +'"><section>' +
                    '<span id="playlist-name">' + (album.name.length > 25 ? album.name.substring(0, 25) + '...' : album.name) + '</span>';
                html += '<div id="playlist-owner"><img id="owner-img" src="' +  album.images[0].url + '" alt="' + album.artists.map(artist => artist.name).join(', ') + '">';
                html += '<span id="owner-name">' + album.artists.map(artist => artist.name).join(', ') + '</span></div><div id="playlist-controls">';
                html += '<span class="material-symbols-rounded" id="play-playlist" onclick="changePlaylistControlStyle(\'play-playlist\'); addAlbum(); playAtIndex(0);">play_arrow</span>';
                html += '<span class="material-symbols-rounded" id="shuffle-playlist" onclick="shuffleBegin(\'album\');">shuffle</span>';
                html += '<span class="material-symbols-rounded" id="add-playlist" onclick="changePlaylistControlStyle(\'add-playlist\');">add</span>';
                html += '</div></section><img id="playlist-img" src="' + album.images[0].url + '" alt="' + album.name + '"></div>';
                html += '<div id="song-list"><div id="song-list"><table class="album-table"><thead><tr>';
                html += '<th>#</th><th>Canción</th><th><span class="material-symbols-rounded">timer</span></th></tr></thead>';
                html += '<tbody id="album-tbody"></tbody></table></div></div>';

                $('#search-results').after(html);

                // Canciones de la playlist
                var tracks = album.tracks.items;
                var index = 1;
                tracks.forEach(track => {
                    var tr = '<tr ondblclick="playSongAlbum(this);" onmouseover="hoverRowIn(this);" onmouseout="hoverRowOut(this);">';
                    tr += '<td song-id="' + track.id + '" preview-url="' + track.preview_url + '">' + (index++) + '</td>';
                    tr += '<td><span class="playlist-song-title">' + track.name + '</span><span class="additional-artists" style="color: #929CB0"> · ' +
                        track.artists.map(add => add.name).join(', ') + '</span>';
                    tr += '</td>';
                    tr += '<td>' + minutes(track.duration_ms) + '</td>';
                    tr += '</tr>';
                    // Carga la fila en el tbody
                    $('#album-tbody').append(tr);
                });
                // Una vez termine todo, el scroll vuelve arriba del todo
                mainDivider.scrollTo({
                    top: 0
                });

                var current_id = document.getElementById('playlist-info').getAttribute('playlist-id');
                var last_id = document.getElementById('last-id').value;
                var shuffle = document.getElementById('shuffle');

                if(current_id == last_id){
                    document.getElementById('play-playlist').style.display = 'none';
                    if(window.getComputedStyle(shuffle).color!=='rgb(173, 136, 176)'){
                        document.getElementById('shuffle-playlist').style.color = '#E8DAED';
                    }
                }
            });
        })
        .catch(function(err) {
            console.error('Error:', err);
        });
}


// Devuelve los milisegundos, en minutos
function minutes(ms){
    let seconds = Math.floor(ms / 1000);
    // Calcular minutos y segundos
    let minutes = Math.floor(seconds / 60);
    let lastSeconds = seconds % 60; 
    // Formatear en mm:ss
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = lastSeconds < 10 ? '0' + lastSeconds : lastSeconds;
    return formattedMinutes + ':' + formattedSeconds;
}

