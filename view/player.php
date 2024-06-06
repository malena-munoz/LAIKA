<div class='player'>
    <input type="hidden" id="last-id">
    <div class="range-input-container" id="main-range-input">
        <input type="range" min="0" max="100" value="0" id="song-process-input" oninput="refreshProgressSong()">
    </div>
    <div id="controls-playing-song">
        <div id="playing-song-info">
            <h3 id="song-title"></h3>
            <h4 id="song-artists"></h4>
        </div>
        <div id="playing-song-buttons">
            <span class="material-symbols-rounded" id="volume-icon" onclick="muteOrDesmute()">volume_down</span>
            <div class="range-input-container">
                <input type="range" min="0" max="100" value="10" id="volume-input" oninput="changeVolume()">
            </div>
            <span class="material-symbols-rounded" id="previous" onclick="playPrevious();">skip_previous</span>
            <span class="material-symbols-rounded" id="play-pause" onclick="changeSongStatus();">play_arrow</span>
            <span class="material-symbols-rounded" id="next" onclick="playNext();">skip_next</span>
            <span class="material-symbols-rounded" id="shuffle" onclick="shuffleSongs();">shuffle</span>
            <span class="material-symbols-rounded" id="menu" open="no">menu</span>
            <div class="dropdown-menu">
                <a href="#">Agregar en...</a>
            </div>
            <div class="dropdown-lists drop-player">
                <img src="./assets/img/arrow.svg" alt="Arrow" id="list-arrow">
                <select name="lists" id="lists">
                </select>
                <span class="material-symbols-rounded" id="player-add-song">add</span>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener('DOMContentLoaded', (event) => {
        let previousTitle = '';
        let previousArtists = '';

        function updateDatabase(title, artists) {
            if (title !== previousTitle || artists !== previousArtists) {
                previousTitle = title;
                previousArtists = artists;
                
                const xhr = new XMLHttpRequest();
                xhr.open('POST', './view/update_song_info.php', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log(xhr.responseText);
                    }
                };
                xhr.send('title=' + encodeURIComponent(title) + '&artists=' + encodeURIComponent(artists));
            }
        }

        const songTitleElement = document.getElementById('song-title');
        const songArtistsElement = document.getElementById('song-artists');

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.target === songTitleElement || mutation.target === songArtistsElement) {
                    const title = songTitleElement.textContent.trim();
                    const artists = songArtistsElement.textContent.trim();
                    updateDatabase(title, artists);
                }
            });
        });

        observer.observe(songTitleElement, { childList: true });
        observer.observe(songArtistsElement, { childList: true });
    });
</script>
