<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"/>
        <link rel="stylesheet" href="assets/css/common_style.css"/>
        <link rel="stylesheet" href="assets/css/nav-style.css"/>
    </head>
    <body>
            <?php $activeLink = 'main_page'; include 'nav_playlists.php';?>
            <div id="main-divider">
                <?php include 'head_interaction.php';?>

                <div class='main-content'>
                    <h3 style="margin: var(--global-separation) 0 2px 0;">Los albumes mas escuchados</h3>
                    <div id="albums-container" class="scroll-container">
                        <button id="albums-scroll-left" class="scroll-left">&lt;</button>
                        <div id="main-albums">

                        </div>
                        <button id="albums-scroll-right" class="scroll-right">&gt;</button>
                    </div>
                    <h3 style="margin: var(--global-separation) 0 2px 0;">Los artistas del momento</h3>
                    <div id="artists-container" class="scroll-container">
                        <button id="artists-scroll-left" class="scroll-left">&lt;</button>
                        <div id="main-artists">
                            
                        </div>
                        <button id="artists-scroll-right" class="scroll-right">&gt;</button>
                    </div>
                </div>
                <section class="nav-filler"></section>
            </div>
    </body>
    <script src="./assets/js/playing_song_script.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./assets/js/main-albums.js"></script>
</html> 