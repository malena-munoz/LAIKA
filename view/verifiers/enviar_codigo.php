<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './../../vendor/autoload.php';

// Generar un código de verificación de 4 dígitos
$codigo = rand(1000, 9999);

// Configuración de colores
$lowLilac = '#E8DAED';
$midLilac = '#AD88B0';
$highLilac = '#755B7D';
$slateLilac = '#4A404E';

// Plantilla de correo electrónico
$emailTemplate = '
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(45deg, var(--high-lilac-slate-gray) 50%, var(--slate-lavender)) fixed;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 2px solid ' . $midLilac . ';
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .header h1 {
            color: ' . $highLilac . ';
            margin: 0;
        }
        .content {
            text-align: center;
        }
        .content p {
            color: ' . $slateLilac . ';
            font-size: 18px;
        }
        .code {
            display: inline-block;
            background-color: ' . $midLilac . ';
            color: white;
            padding: 10px 20px;
            font-size: 24px;
            border-radius: 4px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Código de Verificación</h1>
        </div>
        <div class="content">
            <p>Tu código de verificación es:</p>
            <div class="code">' . $codigo . '</div>
        </div>
    </div>
</body>
</html>
';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
    $email = $_POST['email'];

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
        $mail->Subject = 'Codigo de verificacion';
        $mail->Body = $emailTemplate;

        $mail->send();
        echo 'enviado';
    } catch (Exception $e) {
        echo 'Error: ' . $mail->ErrorInfo;
    }
}