<div class="main-content" id="playlist-display">
    <div id="playlist-info">
        <section>
            <span id="playlist-name"></span>
            <div id="playlist-owner">
                <img id="owner-img" src="./assets/img/uwu.png" alt="">
                <span id="owner-name"></span>
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
        <table class="album-table" id="album-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Canción</th>
                    <th><span class="material-symbols-rounded">timer</span></th>
                </tr>
            </thead>
            <tbody id="album-tbody">
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