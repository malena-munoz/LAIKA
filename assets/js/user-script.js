document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('user-quote').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveQuote();
        }
    });
});

function saveQuote() {
    var quote = document.getElementById('user-quote').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./controller/save_quote.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('Quote saved successfully!');
        }
    };
    xhr.send("quote=" + encodeURIComponent(quote));
}

// Función para obtener el token de acceso, con posibilidad de cambio de credenciales
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
            if (err.status === 429) { // Error 429: Too Many Requests
                console.error('Error 429: Too Many Requests. Cambiando a las segundas credenciales.');
                // Intentar obtener el token con las segundas credenciales
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
                        console.error('Error al obtener el token de acceso con las segundas credenciales:', err);
                    }
                });
            } else {
                console.error('Error al obtener el token de acceso:', err);
            }
        }
    });
}

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

getUserStats(function(userStats) {
    if (userStats.topArtists || userStats.topGenres || userStats.topSongs) {
        getAccessToken(function(accessToken) {
            // Actualizar elementos HTML con los datos obtenidos
            document.getElementById("artist-stats-user").textContent = userStats.favoriteArtist;
            document.getElementById("song-stats-user").textContent = userStats.favoriteSong;
            document.getElementById("genre-stats-user").textContent = userStats.favoriteGenre;
        });
    }
});