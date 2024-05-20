<!DOCTYPE html>
<html lang="es">
    <head>
    <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LAIKA Song Player</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"/>
        <link rel="stylesheet" href="assets/css/common-style.css"/>
        <link rel="stylesheet" href="assets/css/present-style.css"/>
    </head>
    <body>
        <?php $activeLink = 'presentation';?>
        <section id="main-options">
            <a href="">Register</a>
            <button id="log-in-btn">Log In</button>
        </section>
        <div class="full-screen">
            <div class="present-container">
                <img src="./assets/img/laika-big.png" alt="Laika" id="laika">
                <section class="info-card">
                    <span id="name-app">LAIKA</span>
                    <span class="subtitle">The music player that will accompany you from now on.</span>
                    <p>
                        LAIKA is a song player (web and desktop) that allows users to listen and<br>discover new songs, artists and albums.
                        With its minimalist design, immerse<br>yourself in its additional functions, such as purchasing products and tracking concerts.
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
                <div class="letter-container">
                    <section class="letter">L</section>
                    <section class="meaning">ightweight</section>
                    <img src="./assets/img/arrow1.png" alt="Arrow" style="left: 56vw; top: 121vh;">
                    <span style="left: 69.2vw; top: 130.5vh;">Fast like light.</span>
                </div>
                <div class="letter-container">
                    <section class="letter">A</section>
                    <section class="meaning">ccesible</section>
                    <img src="./assets/img/arrow2.png" alt="Arrow" style="left: 32.5vw; top: 128vh;">
                    <span style="left: 15vw; top: 124vh;">Use it on the web... or not.</span>
                </div>
                <div class="letter-container">
                    <section class="letter">I</section>
                    <section class="meaning">ntuitive</section>
                    <img src="./assets/img/arrow3.png" alt="Arrow" style="left: 54.5vw; top: 147.5vh;">
                    <span style="left: 68vw; top: 150vh;">You won't need to google<br>to learn how to use it.</span>
                </div>
                <div class="letter-container">
                    <section class="letter">K</section>
                    <section class="meaning">aleidoscopic</section>
                    <img src="./assets/img/arrow4.png" alt="Arrow" style="left: 33vw; top: 162vh; width: 200px;">
                    <span style="left: 15.2vw; top: 162.5vh; text-align: right;">Varied music in a visually<br>attractive environment.</span>
                </div>
                <div class="letter-container">
                    <section class="letter">A</section>
                    <section class="meaning">pp</section>
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
            <!-- <div id="rocket"></div> -->
            <img src="./assets/img/rocket.png" alt="Rocket" style="width: 300px;">
            <section class="info-card">
                <span class="title">Lightweight</span>
                <p>
                    LAIKA was designed as minimalist as a white room. It offers a simple design and non-repeated code to make a light song player.
                </p>
                <img src="./assets/img/player.png" alt="Player" style="width: 1000px;">
            </section>
        </div>
        <div class="full-screen" style="background-color: blue;"></div>
        <div class="full-screen" style="background-color: orange;"></div>
        <div class="full-screen" style="background-color: green;"></div>
    </body>
</html>