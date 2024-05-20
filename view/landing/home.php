<!-- Contenedores de la busqueda -->
<div id="search-results" style="display: none;">
    <div class='main-content'>
        <div id="artists-container" class="scroll-container">
            <button id="albums-scroll-left" class="scroll-left">
                <span class="material-symbols-rounded">chevron_left</span>
            </button>
            <div id="searched-artists"></div>
            <button id="albums-scroll-right" class="scroll-right">
                <span class="material-symbols-rounded">chevron_right</span>
            </button>
        </div>
        <div id="songs" class="scroll-container">
            <button id="albums-scroll-left" class="scroll-left">
                <span class="material-symbols-rounded">chevron_left</span>
            </button>
            <div id="searched-songs"></div>
            <button id="albums-scroll-right" class="scroll-right">
                <span class="material-symbols-rounded">chevron_right</span>
            </button>
        </div>
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
<?php include 'playlist.php'; include 'home-real.php';?>
<?php endif; ?>

<footer class="footer">
    <div class="footer-left col-md-4 col-sm-6">
        <p class="about">
            <span> About the company</span> Ut congue augue non tellus bibendum, in varius tellus condimentum. In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices eleifend. Integer tellus est, vehicula eu lectus tincidunt,
            ultricies feugiat leo. Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante sed, viverra massa.
        </p>
        <div class="icons">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
            <a href="#"><i class="fa fa-google-plus"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a>
        </div>
    </div>
    <div class="footer-center col-md-4 col-sm-6">
        <div>
            <i class="fa fa-map-marker"></i>
            <p><span> Street name and number</span> City, Country</p>
        </div>
        <div>
            <i class="fa fa-phone"></i>
            <p> (+00) 0000 000 000</p>
        </div>
        <div>
            <i class="fa fa-envelope"></i>
            <p><a href="#"> office@company.com</a></p>
        </div>
    </div>
    <div class="footer-right col-md-4 col-sm-6">
        <h2> Company<span> logo</span></h2>
        <p class="menu">
            <a href="#"> Home</a> |
            <a href="#"> About</a> |
            <a href="#"> Services</a> |
            <a href="#"> Portfolio</a> |
            <a href="#"> News</a> |
            <a href="#"> Contact</a>
        </p>
        <p class="name"> Company Name &copy; 2016</p>
    </div>
</footer>