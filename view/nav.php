<?php
$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

// Verificar si la idUsuario está establecida en la sesión
$idUsuario = isset($_SESSION['idUsuario']) ? $_SESSION['idUsuario'] : -1;

// Conectar a la base de datos
$conn = new mysqli($hostname, $username, $password, $database, $port);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener todas las playlists del usuario
$sql = "SELECT id_playlist, nombre_playlist, foto_playlist FROM usuario_playlists WHERE id_usuario = '$idUsuario'";
$result = $conn->query($sql);
$playlists = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $playlists[] = $row;
    }
}
$conn->close();
?>
<nav class="nav-playlists">
    <div id="vertical-container">
        <div id="scrollable-content">
            <section class="filler"></section>
            <ul id="playlist-list">
                <?php if ($idUsuario != -1): ?>
                    <?php foreach ($playlists as $playlist): ?>
                        <li class="playlist-item" data-id="<?php echo $playlist['id_playlist']; ?>">
                            <?php
                            if (!empty($playlist['foto_playlist'])) {
                                $imageSrc = 'data:image/png;base64,' . base64_encode($playlist['foto_playlist']);
                            } else {
                                $imageSrc = './assets/img/default-song.png';
                            }
                            ?>
                            <div class="playlist" style="background-image: url('<?php echo $imageSrc; ?>');"></div>
                        </li>
                    <?php endforeach; ?>
                    <li id="li-create-playlist">
                        <div id="create-playlist" class="playlist"></div>
                    </li>
                <?php endif; ?>
            </ul>
            <section class="filler"></section>
        </div>
        <div id="img-current-song">
            <img src="assets/img/default-song.png" alt="Album of the playing song">
        </div>
    </div>
</nav>