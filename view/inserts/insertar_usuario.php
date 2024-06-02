<?php
session_start(); // Iniciar sesión PHP

$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

// Obtener los datos enviados desde la solicitud AJAX
$nombreUsuario = $_POST['nombreUsuario'];
$emailUsuario = $_POST['emailUsuario'];

// Establecer conexión con la base de datos
$conn = new mysqli($hostname, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}

// Consulta para insertar los datos en la tabla usuarios
$sql = "INSERT INTO usuarios (nombre_usuario, email_usuario) VALUES ('$nombreUsuario', '$emailUsuario')";
if ($conn->query($sql) === TRUE) {
    // Obtener el ID de usuario generado
    $idUsuario = $conn->insert_id;
    $_SESSION['idUsuario'] = $idUsuario;
    $_SESSION['nombreUsuario'] = $nombreUsuario;
    $_SESSION['emailUsuario'] = $emailUsuario;
    $_SESSION['fotoUsuario'] = $fotoUsuario;
    $_SESSION['fondoUsuario'] = $fondoUsuario;
    $_SESSION['quoteUsuario'] = $quoteUsuario;
    echo $idUsuario;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión
$conn->close();