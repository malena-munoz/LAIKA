<?php
session_start();
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

$conn = new mysqli($hostname, $username, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$idUsuario = $_SESSION['idUsuario'];
$nombreUsuario = isset($_POST['username']) ? $_POST['username'] : null;
$nuevaPassword = isset($_POST['new-password']) ? $_POST['new-password'] : null;

$sql = "UPDATE usuarios SET ";

if ($nombreUsuario) {
    $sql .= "nombre_usuario = '". $conn->real_escape_string($nombreUsuario) . "', ";
}

if ($nuevaPassword) {
    $sql = "UPDATE notas SET ";
    $hashedPassword = password_hash($nuevaPassword, PASSWORD_DEFAULT);
    $sql .= "nota = '". $conn->real_escape_string($hashedPassword) . "', ";
}

if (!empty($_FILES['profile']['tmp_name'])) {
    $fotoUsuario = file_get_contents($_FILES['profile']['tmp_name']);
    $fotoUsuarioBase64 = base64_encode($fotoUsuario);
    $sql .= "foto_usuario = '$fotoUsuarioBase64', ";
}

if (!empty($_FILES['banner']['tmp_name'])) {
    $fondoUsuario = file_get_contents($_FILES['banner']['tmp_name']);
    $fondoUsuarioBase64 = base64_encode($fondoUsuario);
    $sql .= "fondo_usuario = '$fondoUsuarioBase64', ";
}

$sql = rtrim($sql, ', ');
$sql .= " WHERE id_usuario = " . $conn->real_escape_string($idUsuario);

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
