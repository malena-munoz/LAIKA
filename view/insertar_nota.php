<?php
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

// Obtener los datos enviados desde la solicitud AJAX
$idUsuario = $_POST['idUsuario'];
$claveUsuario = $_POST['claveUsuario'];

// Hashear la contraseña
$claveHasheada = password_hash($claveUsuario, PASSWORD_DEFAULT);

// Establecer conexión con la base de datos
$conn = new mysqli($hostname, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}

// Consulta para insertar los datos en la tabla notas
$sql = "INSERT INTO notas (id_usuario, nota) VALUES ('$idUsuario', '$claveHasheada')";
if ($conn->query($sql) === TRUE) {
    echo "Contraseña insertada correctamente en la tabla notas";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar la conexión
$conn->close();