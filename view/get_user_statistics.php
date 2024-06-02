<?php
session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
    $idUsuario = $_SESSION['idUsuario'];

    $hostname = '158.179.215.247';
    $port = '3306';
    $username = 'myuser';
    $password = 'myuser';
    $database = 'ReproductorTFC';

    $conn = new mysqli($hostname, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Obtener los 20 artistas más escuchados
    $sql = "SELECT artista_estadistica FROM estadisticas_artistas WHERE id_usuario = ? ORDER BY aescuchada_estadistica DESC LIMIT 20";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $topArtists = [];
    while ($row = $result->fetch_assoc()) {
        $topArtists[] = $row['artista_estadistica'];
    }
    $stmt->close();

    // Verificar si hay artistas en las estadísticas
    if (empty($topArtists)) {
        $topArtists = null;
    }

    // Obtener los 20 géneros más escuchados
    $sql = "SELECT genero_estadistica FROM estadisticas_generos WHERE id_usuario = ? ORDER BY gescuchado_estadistica DESC LIMIT 20";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $topGenres = [];
    while ($row = $result->fetch_assoc()) {
        $topGenres[] = $row['genero_estadistica'];
    }
    $stmt->close();

    // Verificar si hay géneros en las estadísticas
    if (empty($topGenres)) {
        $topGenres = null;
    }

    // Obtener las 20 canciones más escuchados
    $sql = "SELECT cancion_estadistica FROM estadisticas_canciones WHERE id_usuario = ? ORDER BY cescuchada_estadistica DESC LIMIT 20";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idUsuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $topSongs = [];
    while ($row = $result->fetch_assoc()) {
        $topSongs[] = $row['cancion_estadistica'];
    }
    $stmt->close();

    // Verificar si hay canciones en las estadísticas
    if (empty($topSongs)) {
        $topSongs = null;
    }

    $conn->close();

    // Después de obtener los datos de las estadísticas del usuario
    $favoriteArtist = !empty($topArtists) ? $topArtists[0] : "Desconocido";
    $favoriteGenre = !empty($topGenres) ? $topGenres[0] : "Desconocido";
    $favoriteSong = !empty($topSongs) ? $topSongs[0] : "Desconocido";

    // Enviar datos al script JS
    echo json_encode([
        'loggedin' => true,
        'topArtists' => $topArtists,
        'topGenres' => $topGenres,
        'topSongs' => $topSongs,
        'favoriteArtist' => $favoriteArtist,
        'favoriteGenre' => $favoriteGenre,
        'favoriteSong' => $favoriteSong
    ]);
} else {
    echo json_encode(['loggedin' => false]);
}