<?php
session_start();
if (!isset($_SESSION['loggedin']) || !$_SESSION['loggedin']) {
    die("User not logged in");
}

$idUsuario = $_SESSION['idUsuario'];
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

$title = $_POST['title'] ?? '';
$artists = $_POST['artists'] ?? '';

if (empty($title) || empty($artists)) {
    die("Invalid data");
}

$conn = new mysqli($hostname, $username, $password, $database, $port);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to update or insert song
function updateOrInsertSong($conn, $idUsuario, $title) {
    $sql = "SELECT cescuchada_estadistica FROM estadisticas_canciones WHERE id_usuario = ? AND cancion_estadistica = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $idUsuario, $title);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($cescuchada_estadistica);
        $stmt->fetch();
        $cescuchada_estadistica++;
        $update_sql = "UPDATE estadisticas_canciones SET cescuchada_estadistica = ? WHERE id_usuario = ? AND cancion_estadistica = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("iis", $cescuchada_estadistica, $idUsuario, $title);
        $update_stmt->execute();
    } else {
        $insert_sql = "INSERT INTO estadisticas_canciones (id_usuario, cancion_estadistica, cescuchada_estadistica) VALUES (?, ?, 1)";
        $insert_stmt = $conn->prepare($insert_sql);
        $insert_stmt->bind_param("is", $idUsuario, $title);
        $insert_stmt->execute();
    }
    $stmt->close();
}

// Function to update or insert artist
function updateOrInsertArtist($conn, $idUsuario, $artist) {
    $sql = "SELECT aescuchada_estadistica FROM estadisticas_artistas WHERE id_usuario = ? AND artista_estadistica = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $idUsuario, $artist);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($aescuchada_estadistica);
        $stmt->fetch();
        $aescuchada_estadistica++;
        $update_sql = "UPDATE estadisticas_artistas SET aescuchada_estadistica = ? WHERE id_usuario = ? AND artista_estadistica = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("iis", $aescuchada_estadistica, $idUsuario, $artist);
        $update_stmt->execute();
    } else {
        $insert_sql = "INSERT INTO estadisticas_artistas (id_usuario, artista_estadistica, aescuchada_estadistica) VALUES (?, ?, 1)";
        $insert_stmt = $conn->prepare($insert_sql);
        $insert_stmt->bind_param("is", $idUsuario, $artist);
        $insert_stmt->execute();
    }
    $stmt->close();
}

// Function to get access token from Spotify
function getAccessToken() {
    $clientId = 'c1f77d0fade2485f987f6454a201cab5';
    $clientSecret = '1c3bc66535484d90a934968f469d445a';
    $base64Encoded = base64_encode($clientId . ':' . $clientSecret);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic ' . $base64Encoded));
    $response = curl_exec($ch);
    curl_close($ch);

    $jsonResponse = json_decode($response, true);
    return $jsonResponse['access_token'] ?? null;
}

// Function to get artist genres from Spotify API
function getArtistGenres($accessToken, $artistName) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.spotify.com/v1/search?q=' . urlencode($artistName) . '&type=artist&limit=1');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer ' . $accessToken));
    $response = curl_exec($ch);
    curl_close($ch);

    $jsonResponse = json_decode($response, true);
    $genres = $jsonResponse['artists']['items'][0]['genres'] ?? array();
    return $genres;
}

// Function to update or insert genre
function updateOrInsertGenre($conn, $idUsuario, $genre) {
    $sql = "SELECT gescuchado_estadistica FROM estadisticas_generos WHERE id_usuario = ? AND genero_estadistica = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $idUsuario, $genre);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($gescuchado_estadistica);
        $stmt->fetch();
        $gescuchado_estadistica++;
        $update_sql = "UPDATE estadisticas_generos SET gescuchado_estadistica = ? WHERE id_usuario = ? AND genero_estadistica = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("iis", $gescuchado_estadistica, $idUsuario, $genre);
        $update_stmt->execute();
    } else {
        $insert_sql = "INSERT INTO estadisticas_generos (id_usuario, genero_estadistica, gescuchado_estadistica) VALUES (?, ?, 1)";
        $insert_stmt = $conn->prepare($insert_sql);
        $insert_stmt->bind_param("is", $idUsuario, $genre);
        $insert_stmt->execute();
    }
    $stmt->close();
}

$accessToken = getAccessToken();

// Update or insert song
updateOrInsertSong($conn, $idUsuario, $title);

// Update or insert each artist
$artistsArray = explode(", ", $artists);
foreach ($artistsArray as $artist) {
    updateOrInsertArtist($conn, $idUsuario, $artist);

    // Get genres for each artist and update or insert them
    $genres = getArtistGenres($accessToken, $artist);
    foreach ($genres as $genre) {
        updateOrInsertGenre($conn, $idUsuario, $genre);
    }
}

$conn->close();

echo "Success";
?>

