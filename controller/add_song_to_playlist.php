<?php
session_start();
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

$conn = new mysqli($hostname, $username, $password, $database, $port);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$idPlaylist = isset($_POST['id_playlist']) ? $conn->real_escape_string($_POST['id_playlist']) : '';
$nombreCancion = isset($_POST['nombre_cancion']) ? $conn->real_escape_string($_POST['nombre_cancion']) : '';
$artistaCancion = isset($_POST['artista_cancion']) ? $conn->real_escape_string($_POST['artista_cancion']) : '';

if ($idPlaylist && $nombreCancion && $artistaCancion) {
    $sql = "INSERT INTO playlist_canciones (id_playlist, nombre_cancion, artista_cancion) VALUES ('$idPlaylist', '$nombreCancion', '$artistaCancion')";
    if ($conn->query($sql) === TRUE) {
        echo "Canción agregada exitosamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Datos incompletos";
}

$conn->close();
?>
