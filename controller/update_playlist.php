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

$id = isset($_POST['id']) ? $_POST['id'] : '';
$name = isset($_POST['name']) ? $_POST['name'] : '';
$image = isset($_POST['image']) ? $_POST['image'] : '';

if ($name) {
    $sql = "UPDATE usuario_playlists SET nombre_playlist = ? WHERE id_playlist = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $name, $id);
    $stmt->execute();
}

if ($image) {
    $image = str_replace('data:image/png;base64,', '', $image);
    $image = str_replace('data:image/jpeg;base64,', '', $image);
    $image = str_replace(' ', '+', $image);
    $imageData = base64_decode($image);

    $sql = "UPDATE usuario_playlists SET foto_playlist = ? WHERE id_playlist = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $imageData, $id);
    $stmt->execute();
}

$conn->close();