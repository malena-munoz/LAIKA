<?php
session_start();
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

$idUsuario = $_SESSION['idUsuario'];
$idPlaylist = isset($_GET['id']) ? $_GET['id'] : '';

$conn = new mysqli($hostname, $username, $password, $database, $port);
if ($conn->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
}

// Sanitizar entradas
$idUsuario = $conn->real_escape_string($idUsuario);
$idPlaylist = $conn->real_escape_string($idPlaylist);

// Inicializar la estructura de la respuesta
$playlist = [
    'name' => 'Sin Nombre',
    'image' => './assets/img/default-song.png',
    'owner' => 'Unknown',
    'tracks' => []
];

// Obtener los detalles de la playlist
$sql = "SELECT nombre_playlist, foto_playlist, editable, link_playlist FROM usuario_playlists WHERE id_usuario = '$idUsuario' AND id_playlist = '$idPlaylist'";
$result = $conn->query($sql);
if ($result && $result->num_rows > 0) {
    $playlistData = $result->fetch_assoc();
    $playlist['name'] = $playlistData['nombre_playlist'] ? $playlistData['nombre_playlist'] : $playlist['name'];
    $playlist['image'] = $playlistData['foto_playlist'] ? 'data:image/png;base64,' . base64_encode($playlistData['foto_playlist']) : $playlist['image'];
    $playlist['editable'] = $playlistData['editable'];
    $playlist['link_playlist'] = $playlistData['link_playlist'];
}

// Obtener el nombre del propietario de la playlist
$sql = "SELECT nombre_usuario FROM usuarios WHERE id_usuario = '$idUsuario'";
$ownerResult = $conn->query($sql);
if ($ownerResult && $ownerResult->num_rows > 0) {
    $owner = $ownerResult->fetch_assoc();
    $playlist['owner'] = $owner['nombre_usuario'] ? $owner['nombre_usuario'] : $playlist['owner'];
}

// Obtener las canciones de la playlist
$sql = "SELECT nombre_cancion, artista_cancion FROM playlist_canciones WHERE id_playlist = '$idPlaylist'";
$result = $conn->query($sql);
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $playlist['tracks'][] = $row;
    }
}

$conn->close();

echo json_encode($playlist);
?>
