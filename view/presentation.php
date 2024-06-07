<?php
$style = '';

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
    $style = 'none';
} else {
    $style = 'block';
}

?>
<div id="presentation" style="display: <?php echo $style; ?>">
        <section id="presentation-login">
            <?php include 'components/header-buttons.php';?>
        </section>
        <div class="full-screen">
            <div class="present-container">
                <img src="./assets/img/laika-logo.png" alt="Laika" id="laika">
                <section class="info-card main">
                    <span id="name-app">LAIKA</span>
                    <span class="subtitle">El reproductor que te acompañará a partir de hoy.</span>
                    <p>
                        LAIKA es un reproductor de música moderno a disposición del usuario, para<br>recomendarle contenido según a sus
                        reproducciones y, descubrir nuevas<br>canciones, géneros u artistas.
                    </p>
                </section>
            </div>
        </div>
        <div class="full-screen">
            <div class="present-container">
                <section class="marquee">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                </section>
                <h3>LAIKA fue desarrollado con los lenguajes y tecnologías...</h3>
                <div class="tech">
                    <section>
                        <img src="assets/img/php.png" alt="">
                        <h2>PHP</h2>
                    </section>
                    <section>
                        <img src="assets/img/css.png" alt="">
                        <h2>CSS</h2>
                    </section>
                    <section>
                        <img src="assets/img/js.png" alt="">
                        <h2>JavaScript</h2>
                    </section>
                    <section>
                        <img src="assets/img/jquery.png" alt="">
                        <h2>JQuery</h2>
                    </section>
                    <section>
                        <img src="assets/img/spotify.png" alt="">
                        <h2>Spotify API</h2>
                    </section>
                    <section>
                        <img src="assets/img/beekeeper.png" alt="">
                        <h2>Beekeeper Stu.</h2>
                    </section>
                </div>
                <section class="marquee">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                    <img src="./assets/img/rocks.png" alt="Rocks">
                </section>
            </div>
        </div>
        <div class="full-screen">
            <section class="diagram">
                <span class="subtitle bigger">¿Qué puedes hacer con LAIKA?</span>
                <section class="info-card">
                    <section class="v-line"></section>
                    <section class="info-functionalities">
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Escuchar toda la música que quieras.</h2>
                        </div>
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Obtener recomendaciones en base a tus reproducciones.</h2>
                        </div>
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Personalizar tu perfil y mostrar tus "favoritos".</h2>
                        </div>
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Guardar playlists o álbumes públicos.</h2>
                        </div>
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Crear tus propias playlists y personalizarlas.</h2>
                        </div>
                    </section>
                </section>
            </section>
        </div>
        <div class="full-screen">
            <section class="diagram">
                <span class="subtitle bigger">Dificultades durante el proceso...</span>
                <section class="info-card">
                    <section class="v-line"></section>
                    <section class="info-functionalities">
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Comprender el funcionamiento de la API de Spotify.</h2>
                        </div>
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Crear el argoritmo de recomendaciones al usuario.</h2>
                        </div>
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Diseñar la interfaz de usuario más responsiva posible sin 'media screen'.</h2>
                        </div>
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Funcionamiento del reproductor: play/pause, mezcla, etc.</h2>
                        </div>
                        <div class="functionality">
                            <section class="h-line"></section>
                            <h2>Maniputación de la base de datos.</h2>
                        </div>
                    </section>
                </section>
            </section>
        </div>
        <div class="full-screen">
            <div id="circle-orbit-container">
                <div id="inner-orbit">
                    <div class="inner-orbit-cirlces"></div>
                </div>
                <div id="middle-orbit">
                    <div class="middle-orbit-cirlces"></div>
                </div>
                <div id="outer-orbit">
                    <div class="outer-orbit-cirlces"></div>
                </div>
            </div>
            <div class="present-container available">
                <span class="subtitle bigger" style="border-bottom:0">Disponible en...</span>
                <div class="tech" style="flex-wrap:nowrap;width: fit-content;">
                    <section>
                        <img src="assets/img/web.png" alt="">
                        <h2>Web</h2>
                    </section>
                    <section style="width: fit-content">
                        <section style="flex-direction:row;width: fit-content">
                            <img src="assets/img/pc.png" alt="">
                            <img src="assets/img/nativefier.png" alt="" style="height: 130px;width: auto;">
                        </section>
                        <h2>Escritorio mediante 'Nativefier'</h2>
                    </section>
                </div>
                <span class="subtitle">¿Quieres tener la versión de escritorio? 
                    Haz click <a href="https://drive.google.com/file/d/1vnZtPt_VBKhz8f9tGCI5CGGjTmIt6QpU/view?usp=sharing" target="_blank" >aquí</a> para descargarlo.</span>
            </div>
        </div>
        <div class="full-screen" style="flex-direction:column">
            <img src="assets/img/moon.png" alt="Moon" style="width: 100%; padding-top:300px">
            <img src="./assets/img/laika-big.png" alt="Laika" id="laika" style="width:280px; margin-top:-700px">
        </div>
        <div class="stars">
            <?php
                $num_stars = 500; // Número de estrellas

                for ($i = 0; $i < $num_stars; $i++) {
                    $x = rand(0, 100);
                    $y = rand(0, 100);
                    $size = rand(1, 3);
                    echo "<div class='star' style='left: $x%; top: $y%; width: ${size}px; height: ${size}px;'></div>";
                }
            ?>
        </div>
</div>

