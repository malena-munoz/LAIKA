<div id="user-icon">
    <label class="popup">
        <input type="checkbox">
        <div class="burger" id="user-burger" tabindex="0"></div>
        <nav class="popup-window">
            <ul>
                <li>
                    <button onclick="openUser();">
                        <span class="material-symbols-rounded">person</span>
                        <span>Perfil</span>
                    </button>
                </li>
                <li>
                    <button onclick="openSettings();">
                        <span class="material-symbols-rounded">settings</span>
                        <span>Ajustes</span>
                    </button>
                </li>
                <hr>
                <li>
                    <button id="logout-button">
                        <span class="material-symbols-rounded">close</span>
                        <span>Cerrar Sesión</span>
                    </button>
                </li>
            </ul>
        </nav>
    </label>
</div>

<script>
document.getElementById('logout-button').addEventListener('click', function() {
    window.location.href = './view/verifiers/logout.php';
});

window.onload = function() {
    var userBurger = document.getElementById('user-burger');
    var userPhoto = '<?php echo isset($_SESSION["fotoUsuario"]) && $_SESSION["fotoUsuario"] ? "data:image/png;base64," . $_SESSION["fotoUsuario"] : "./assets/img/default-user.png"; ?>';
    userBurger.style.backgroundImage = 'url(' + userPhoto + ')';
};
</script>