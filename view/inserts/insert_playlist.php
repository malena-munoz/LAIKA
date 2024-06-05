<?php
session_start();
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

$idUsuario = $_SESSION['idUsuario'];
$nombrePlaylist = isset($_POST['nombre_playlist']) ? $_POST['nombre_playlist'] : 'Nueva Playlist';
$defaultImage = './assets/img/default-song.png';

// Conectar a la base de datos
$conn = new mysqli($hostname, $username, $password, $database, $port);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Insertar nueva playlist
$sql = "INSERT INTO usuario_playlists (id_usuario, nombre_playlist, foto_playlist, editable) VALUES ('$idUsuario', NULL, NULL, 1)";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => $conn->error]);
}

$conn->close();