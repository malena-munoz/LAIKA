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

$idPlaylist = isset($_POST['id']) ? $conn->real_escape_string($_POST['id']) : '';
$idUsuario = $_SESSION['idUsuario'];

if ($idPlaylist && $idUsuario) {
    $sql = "DELETE FROM usuario_playlists WHERE id_playlist = '$idPlaylist' AND id_usuario = '$idUsuario'";
    if ($conn->query($sql) === TRUE) {
        echo "Plalist eliminada exitosamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Datos incompletos";
}

$conn->close();
?>
