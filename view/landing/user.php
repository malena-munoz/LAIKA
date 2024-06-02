<div class="main-content" id="user-display">
    <?php
    $idUsuario = $_SESSION['idUsuario'];
    $nombreUsuario = $_SESSION['nombreUsuario'];
    $emailUsuario = $_SESSION['emailUsuario'];
    $fotoUsuario = $_SESSION['fotoUsuario'];
    $fondoUsuario = $_SESSION['fondoUsuario'];
    $quoteUsuario = $_SESSION['quoteUsuario'];

    $srcFotoUsuario = isset($fotoUsuario) && !is_null($fotoUsuario) ? 'data:image/png;base64,' . $fotoUsuario : './assets/img/default-user.png';
    $srcFondoUsuario = isset($fondoUsuario) && !is_null($fondoUsuario) ? 'data:image/png;base64,' . $fondoUsuario : './assets/img/default-bg.png';
    ?>
    <div class="user-big-container">
        <img id="user-background" src="<?php echo htmlspecialchars($srcFondoUsuario); ?>" alt="">
    </div>
    <div class="user-main-container">
        <img id="user-portrait" src="<?php echo htmlspecialchars($srcFotoUsuario); ?>" alt="">
        <span id="user-name"><?php echo htmlspecialchars($nombreUsuario); ?></span>
    </div>
    <div class="user-note-container">
        <section class="user-note">
            <!-- <p>puta</p> -->
            <textarea id="user-quote"><?php echo htmlspecialchars($quoteUsuario); ?></textarea>
        </section>
    </div>
    <div class="user-note-container">
        <section class="user-note stats-note">
            <div class="user-stats">
                <h4>Mi artista favorito es... </h4>
                <span id="artist-stats-user">Artista</span>
            </div>
            <div class="user-stats">
                <h4>Soy fan de la canción... </h4>
                <span id="song-stats-user">Canción 1</span>
            </div>
            <div class="user-stats">
                <h4>Normalmente escucho... </h4>
                <span id="genre-stats-user">Género 1</span>
            </div>
        </section>
    </div>
    <h3>Playlists</h3>
    <div id="user-playlist-container" class="scroll-container">
        <button id="albums-scroll-left" class="scroll-left">
            <span class="material-symbols-rounded">chevron_left</span>
        </button>
        <div id="main-user-playlists">
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
            <div class="card_loader">
                <div class="card__skeleton card__image"></div>
                <div class="card__skeleton card__title"></div>
                <div class="card__skeleton card__artist"></div>
            </div>
        </div>
        <button id="albums-scroll-right" class="scroll-right">
            <span class="material-symbols-rounded">chevron_right</span>
        </button>
    </div>
</div>