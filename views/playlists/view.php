<div id="stickydiv">
    <div class="btnWrapper">
        <img src="css/resources/player/prevBtn.jpg" id="prevBtn">
    </div>
    <div class="btnWrapper">
        <img src="css/resources/player/playBtn.jpg" id="playPauseBtn">
    </div>
    <div class="btnWrapper">
        <img src="css/resources/player/nextBtn.jpg" id="nextBtn">
    </div>

    <div class="songInfoContainer">
        <div class="titlePlusTime">
            <div id="songTitle">No song selected</div>
            <div id="songTime">0:00 - 0:00</div>
        </div>
        <div class="scrubber" id="scrubber">
            <div id="progressBar"></div>
            <!--<div class="loaded"></div>-->
        </div>
    </div>
    <div class="btnWrapper">
        <img src="css/resources/player/randomBtn.jpg" id="randomBtn">
    </div>

    <div class="btnWrapper">
        <img src="css/resources/player/repeatAllBtn.jpg" id="repeatAllBtn">
    </div>

    <div class="btnWrapper">
        <img src="css/resources/player/repeatOneBtn.jpg" id="repeatOneBtn">
    </div>

    <div id="audioSliderContainer">
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
    </div>
</div>

<?php
/* @var $this yii\web\View */

use app\models\RelSongsPlaylists;
use app\models\Songs;
echo "<div class='ostContainer'>";
$getAllSongs = RelSongsPlaylists::find()->where(['playlist_id' => $playlist->id])->all();
foreach ($getAllSongs as $relSong) {
    $song = Songs::find()->where(['id' => $relSong->song_id])->one();
    echo $this->render('_playlistViewSongIcon', ['song' => $song]);
}
echo "</div>";

?>

<audio controls id="audio"></audio>
<div id="testdiv"></div>
<script src="js/newautoplay.js"></script>