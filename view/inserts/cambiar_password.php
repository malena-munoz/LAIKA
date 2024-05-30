<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['new_password'])) {
    $newPassword = $_POST['new_password'];

    // Asegúrate de que el email esté en la sesión
    if (isset($_SESSION['email'])) {
        $email = $_SESSION['email'];

        // Hash de la nueva contraseña
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        // Conexión a la base de datos
        $hostname = '158.179.215.247';
        $port = '3306';
        $username = 'myuser';
        $password = 'myuser';
        $database = 'ReproductorTFC';

        $conn = new mysqli($hostname, $username, $password, $database, $port);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Actualizar la contraseña en la base de datos (tabla "notas")
        $stmt = $conn->prepare("UPDATE notas SET nota = ? WHERE id_usuario = (SELECT id_usuario FROM usuarios WHERE email_usuario = ?)");
        $stmt->bind_param('ss', $hashedPassword, $email);

        if ($stmt->execute()) {
            echo 'cambiado';
        } else {
            echo 'error';
        }

        $stmt->close();
        $conn->close();
    } else {
        echo 'Error: email no definido en la sesión.';
    }
}