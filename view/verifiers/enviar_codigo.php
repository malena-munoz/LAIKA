<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './../../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
    $email = $_POST['email'];

    // Generar un código de verificación de 4 dígitos
    $codigo = rand(1000, 9999);

    // Iniciar la sesión y guardar el email y el código de verificación
    session_start();
    $_SESSION['codigo_verificacion'] = $codigo;
    $_SESSION['email'] = $email;

    // Crear una instancia de PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Cambia esto por el servidor SMTP de tu proveedor de correo
        $mail->SMTPAuth = true;
        $mail->Username = 'srbylukasmicz@gmail.com'; // Cambia esto por tu dirección de correo electrónico
        $mail->Password = 'xcfabockaozhpvyu'; // Cambia esto por la contraseña de tu correo electrónico
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        // Configuración del correo
        $mail->setFrom('srbylukasmicz@gmail.com', 'Laika'); // Cambia esto por tu dirección de correo electrónico y nombre
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Código de verificación';
        $mail->Body = 'Tu código de verificación es: <b>' . $codigo . '</b>';

        $mail->send();
        echo 'enviado';
    } catch (Exception $e) {
        echo 'Error: ' . $mail->ErrorInfo;
    }
}