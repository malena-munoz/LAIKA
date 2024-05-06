<footer>
    <div class="range-input-container" id="main-range-input">
        <input type="range" min="0" max="100" value="0" id="song-process-input" oninput="refreshProgressSong()">
    </div>
    <div id="controls-playing-song">
        <div id="playing-song-info">
            <h3>PAID</h3>
            <h4>¥$, Kanye West, Ty Dolla $ign</h4>
        </div>
        <div id="playing-song-buttons">
            <span class="material-symbols-rounded" id="volume-icon" onclick="muteOrDesmute()">volume_down</span>
            <div class="range-input-container">
                <input type="range" min="0" max="100" value="50" id="volume-input" oninput="changeVolume()">
            </div>
            <span class="material-symbols-rounded" id="previous">skip_previous</span>
            <span class="material-symbols-rounded" id="play-pause" onclick="changeSongStatus()">play_arrow</span>
            <span class="material-symbols-rounded" id="next">skip_next</span>
            <span class="material-symbols-rounded" id="menu">menu</span>
        </div>
    </div>
</footer>