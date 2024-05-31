<!-- Contenedores de la busqueda -->
<div id="search-results" style="display: none;">
    <div class='main-content'>
        <h3>Artistas</h3>
        <div id="artists-container" class="scroll-container">
            <button id="albums-scroll-left" class="scroll-left">
                <span class="material-symbols-rounded">chevron_left</span>
            </button>
            <div id="searched-artists"></div>
            <button id="albums-scroll-right" class="scroll-right">
                <span class="material-symbols-rounded">chevron_right</span>
            </button>
        </div>
        <h3>Canciones</h3>
        <div id="songs" class="scroll-container">
            <button id="albums-scroll-left" class="scroll-left">
                <span class="material-symbols-rounded">chevron_left</span>
            </button>
            <div id="searched-songs"></div>
            <button id="albums-scroll-right" class="scroll-right">
                <span class="material-symbols-rounded">chevron_right</span>
            </button>
        </div>
        <h3>Álbumes</h3>
        <div id="albums-container" class="scroll-container">
            <button id="albums-scroll-left" class="scroll-left">
                <span class="material-symbols-rounded">chevron_left</span>
            </button>
            <div id="searched-albums"></div>
            <button id="albums-scroll-right" class="scroll-right">
                <span class="material-symbols-rounded">chevron_right</span>
            </button>
        </div>
    </div>
</div>


<?php if (!isset($_GET['text']) || empty($_GET['text'])): ?>
<?php include 'home-real.php';?>
<?php endif; ?>

<footer class="footer">
    <div class="company-info">
        <img src="./assets/img/laika-logo.png" alt="Laika Logo">
        <section>
            <span class="company-name">Laika Songplayer</span>
            <span class="company-desc">
                Laika es un reproductor de música ligero 
                y agradable a la vista, para ofrecer al 
                usuario la mejor experiencia musical posible.
            </span>
        </section>
    </div>
    <section class="contact">
        <section>
            <span class="material-symbols-rounded">call</span>
            <span class="contact-info">(+34) 000 00 00 00</span>
        </section>
        <section>
            <span class="material-symbols-rounded">mail</span>
            <span class="contact-info">laika.songplayer@gmail.com</span>
        </section>
    </section>
    <section class="contact">
        <a href="#">Inicio</a>
        <a href="#">Página principal</a>
        <a href="#">Sobre nosotros</a>
        <a href="#">Política de privacidad</a>
    </section>
</footer>