<div class="main-content" id="album-display">
    <div id="playlist-info">
        <section>
            <span id="playlist-name">Playlist</span>
            <div id="playlist-owner">
                <img id="owner-img" src="./assets/img/uwu.png" alt="">
                <span id="owner-name">Creador</span>
            </div>
            <div id="playlist-controls">
                <span class="material-symbols-rounded" id="play-playlist" onclick="changePlaylistControlStyle('play-playlist');">play_arrow</span>
                <span class="material-symbols-rounded" id="shuffle-playlist" onclick="changePlaylistControlStyle('shuffle-playlist');">shuffle</span>
                <span class="material-symbols-rounded" id="add-playlist" onclick="changePlaylistControlStyle('add-playlist');">add</span>
            </div>
        </section>
        <img id="playlist-img" src="./assets/img/uwu.png" alt="Playlist-Img">
    </div>
    <div id="song-list">
        <!-- <table class="playlist-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Canción</th>
                    <th>Álbum</th>
                    <th><span class="material-symbols-rounded">timer</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>
                        <img class="song-playlist-img" src="./assets/img/uwu.png" alt="Playlist-Img"/>
                        <section>
                            <span class="playlist-song-title">Canción</span>
                            <span class="playlist-song-artist">Artista</span>
                        </section>
                    </td>
                    <td>Álbum 1</td>
                    <td>3:00</td>
                </tr>
            </tbody>
        </table> -->
        <table class="album-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Canción</th>
                    <th><span class="material-symbols-rounded">timer</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>
                        <span class="playlist-song-title">Canción</span>
                    </td>
                    <td>3:00</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>