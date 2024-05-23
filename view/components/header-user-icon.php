<div id="user-icon">
    <label class="popup">
        <input type="checkbox">
        <div class="burger" tabindex="0">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav class="popup-window">
            <ul>
            <li>
                <button>
                    <span class="material-symbols-rounded">person</span>
                    <span>Perfil</span>
                </button>
            </li>
            <li>
                <button>
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
    // Redirigir a un script PHP que cierre la sesión
    window.location.href = './view/verifiers/logout.php';
});
</script>