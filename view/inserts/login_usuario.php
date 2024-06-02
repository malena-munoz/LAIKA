<?php
session_start();

$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

// Obtener los datos enviados desde la solicitud AJAX
$emailUsuario = $_POST['emailUsuario'];
$claveUsuario = $_POST['claveUsuario'];

// Establecer conexión con la base de datos
$conn = new mysqli($hostname, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("La conexión falló: " . $conn->connect_error);
}

// Verificar si el email está registrado
$sql = "SELECT id_usuario, nombre_usuario, email_usuario, foto_usuario, fondo_usuario, quote_usuario FROM usuarios WHERE email_usuario='$emailUsuario'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // El email está registrado, verificar la contraseña
    $row = $result->fetch_assoc();
    $idUsuario = $row['id_usuario'];
    $nombreUsuario = $row['nombre_usuario'];
    $emailUsuario = $row['email_usuario'];
    $fotoUsuario = $row['foto_usuario'];
    $fondoUsuario = $row['fondo_usuario'];
    $quoteUsuario = $row['quote_usuario'];

    // Obtener la contraseña hasheada de la tabla notas
    $sqlClave = "SELECT nota FROM notas WHERE id_usuario='$idUsuario'";
    $resultClave = $conn->query($sqlClave);

    if ($resultClave->num_rows > 0) {
        $rowClave = $resultClave->fetch_assoc();
        $hashedPassword = $rowClave['nota'];

        // Verificar la contraseña
        if (password_verify($claveUsuario, $hashedPassword)) {
            // Contraseña correcta, iniciar sesión
            $_SESSION['idUsuario'] = $idUsuario;
            $_SESSION['nombreUsuario'] = $nombreUsuario;
            $_SESSION['emailUsuario'] = $emailUsuario;
            $_SESSION['fotoUsuario'] = $fotoUsuario;
            $_SESSION['fondoUsuario'] = $fondoUsuario;
            $_SESSION['quoteUsuario'] = $quoteUsuario;
            $_SESSION['loggedin'] = true;
            echo json_encode(["status" => "success", "nombreUsuario" => $nombreUsuario, "emailUsuario" => $emailUsuario, "fotoUsuario" => $fotoUsuario, "fondoUsuario" => $fondoUsuario, "quoteUsuario" => $quoteUsuario]);
        } else {
            // Contraseña incorrecta
            echo json_encode(["status" => "incorrect_password"]);
        }
    } else {
        // No se encontró la contraseña
        echo json_encode(["status" => "error"]);
    }
} else {
    // El email no está registrado
    echo json_encode(["status" => "unregistered_email"]);
}

// Cerrar la conexión
$conn->close();