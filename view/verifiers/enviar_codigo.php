<?php
session_start();

try {
    if (!isset($_POST['email'])) {
        throw new Exception('Email no proporcionado.');
    }

    $email = $_POST['email'];
    $codigo = rand(1000, 9999);

    // Guardar el código en la sesión para comparar más tarde
    $_SESSION['codigo_recuperacion'] = $codigo;

    // Detalles del correo
    $subject = "Recuperación de contraseña";
    $message = "Tu código de recuperación es: " . $codigo;
    $headers = "From: no-reply@tu-dominio.com";

    // Enviar el correo
    if (mail($email, $subject, $message, $headers)) {
        echo "Correo enviado";
    } else {
        throw new Exception('Error al enviar el correo.');
    }
} catch (Exception $e) {
    // Registrar el error en el log del servidor y devolver una respuesta 500
    error_log($e->getMessage());
    http_response_code(500);
    echo "Error: " . $e->getMessage();
}