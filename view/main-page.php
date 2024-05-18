<?php
session_start();

// Lógica para iniciar sesión del usuario...

$_SESSION['loggedin'] = false; // Establecer la variable de sesión
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"/>
        <link rel="stylesheet" href="assets/css/common-style.css"/>
        <link rel="stylesheet" href="assets/css/nav-style.css"/>
        <link rel="stylesheet" href="assets/css/player-style.css"/>
        <link rel="stylesheet" href="assets/css/header-style.css"/>
        <link rel="stylesheet" href="assets/css/home-style.css"/>
        <link rel="stylesheet" href="assets/css/register-style.css"/>
    </head>
    <body>
        <div id="modal" class="modal">
            <div class="modal-content">
                <?php include 'register.php'; ?>
            </div>
        </div>
        <!-- Canción en reproducción -->
        <audio id="playing-song-audio" ontimeupdate="refreshProgressBar(), changeMaxValueSongProgress()">
            <source src="./assets/audio/paid.mp3" type="audio/mp3">
        </audio>
        <?php include 'nav.php';?>
        <div id="main-divider">
            <!-- Barra de búsqueda -->
            <?php include 'header.php';?>

            <?php include 'landing/home-real.php';?>
            <!-- Datos empresa -->
            <!-- <php include 'home.php';?> -->
            <!-- Sección de relleno -->
            <section class="filler"></section>
        </div>
        <!-- Reproductor -->
        <?php include 'player.php';?>
    </body>
    <script src="https://widget.deezer.com/widget/dynamic/deezer-widget-loader.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./assets/js/playing-song-script.js"></script>
    <script src="./assets/js/common-script.js"></script>
    <script src="./assets/js/search-script.js"></script>
    <script src="./assets/js/main-albums.js"></script>
</html> 