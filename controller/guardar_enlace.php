<?php
session_start();
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

// Obtener los datos del enlace de la playlist
$playlistLink = $_POST['playlistLink'];

// Suponiendo que ya tienes la conexión a la base de datos establecida
$conn = new mysqli($hostname, $username, $password, $database);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

// Suponiendo que ya tienes el ID del usuario en $_SESSION['idUsuario']
$idUsuario = $_SESSION['idUsuario'];
$editable = 0;

// Preparar la consulta SQL para insertar el enlace en la base de datos
$sql = "INSERT INTO usuario_playlists (id_usuario, editable, link_playlist) VALUES ('$idUsuario', '$editable', '$playlistLink')";

if ($conn->query($sql) === TRUE) {
    echo "Enlace de playlist guardado exitosamente en la base de datos.";
} else {
    echo "Error al guardar el enlace de la playlist en la base de datos: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
