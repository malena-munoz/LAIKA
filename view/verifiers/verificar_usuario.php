<?php
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

// Obtener el nombre de usuario enviado desde la solicitud AJAX
$nombreUsuario = $_GET['nombre'];

// Establecer conexión con la base de datos
$conn = new mysqli($hostname, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}

// Consulta para verificar si el nombre de usuario ya está en uso
$sql = "SELECT nombre_usuario FROM usuarios WHERE nombre_usuario = '$nombreUsuario'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // El nombre de usuario ya está en uso
    echo "ocupado";
} else {
    // El nombre de usuario está disponible
    echo "disponible";
}

// Cerrar la conexión
$conn->close();