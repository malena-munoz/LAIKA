<?php
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

// Obtener el email enviado desde la solicitud AJAX
$emailUsuario = $_GET['email'];

// Establecer conexión con la base de datos
$conn = new mysqli($hostname, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}

// Consulta para verificar si el email ya está en uso
$sql = "SELECT email_usuario FROM usuarios WHERE email_usuario = '$emailUsuario'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // El email ya está en uso
    echo "ocupado";
} else {
    // El email está disponible
    echo "disponible";
}

// Cerrar la conexión
$conn->close();