<div class="container">
  <div class="section">
    <div class="scrollable-content">
        <section class="nav-filler"></section>
        <ul id="playlist-list">
            <li>
                <div class="playlist">1</div>
            </li>
            <li>
                <div class="playlist">2</div>
            </li>
            <li>
                <div class="playlist">3</div>
            </li>
            <li>
                <div class="playlist">4</div>
            </li>
            <li>
                <div class="playlist">5</div>
            </li>
            <li>
                <div class="playlist">6</div>
            </li>
            <li>
                <div class="playlist">7</div>
            </li>
        </ul>
        <section class="nav-filler"></section>
    </div>
    <footer> 
        <div id="img-playing-song">
            <img src="assets\img\image.png" alt="Album of the playing song">
        </div> 
        <div id="playing-song-controller">
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
                        <input type="range" min="0" max="100" value="0" id="volume-input" oninput="changeVolume()">
                    </div>
                    <span class="material-symbols-rounded" id="previous">skip_previous</span>
                    <span class="material-symbols-rounded" id="play-pause" onclick="changeSongStatus()">play_arrow</span>
                    <span class="material-symbols-rounded" id="next">skip_next</span>
                    <span class="material-symbols-rounded" id="menu">menu</span>
                </div>
            </div>
        </div>
    </footer>
  </div>
</div>