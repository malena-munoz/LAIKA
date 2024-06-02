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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $quote = $_POST['quote'];
    $idUsuario = $_SESSION['idUsuario'];

    $stmt = $conn->prepare("UPDATE usuarios SET quote_usuario = ? WHERE id_usuario = ?");
    $stmt->bind_param("si", $quote, $idUsuario);

    if ($stmt->execute()) {
        echo "Quote updated successfully.";
    } else {
        echo "Error updating quote: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
