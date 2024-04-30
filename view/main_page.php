<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"/>
        <link rel="stylesheet" href="assets/css/common_style.css"/>
    </head>
    <body>
        <!-- Etiqueta del audio actual, contiene el archivo MP3 -->
        <audio id="playing-song-audio" ontimeupdate="refreshProgressBar(), changeMaxValueSongProgress()">
            <source src="paid.mp3" type="audio/mp3">
        </audio>
        <!-- Página de la barra vertical de navegación de playlists del usuario -->
        <?php $activeLink = 'main_page'; include 'nav_playlists.php';?>
        <!-- Contenedor principal, irá cambiando conforme al programa -->
        <div id="main-divider">
            <!-- Página del encabezado de navegación principal y otros controles que interaccionará el usuario -->
            <?php include 'head_interaction.php';?>
            <h1>HOLA</h1>
        </div>
        <!-- Página del controlador de la canción actual -->
        <?php include 'footer_playing_song.php';?>
    </body>
    <script src="./assets/js/playing_song_script.js"></script>
</html> 