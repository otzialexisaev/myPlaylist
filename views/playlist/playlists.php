<?php
/* @var $this yii\web\View */

use app\models\RelSongsPlaylists;
use app\models\Playlist;
use app\models\Songs;
use yii\helpers\Html;

echo "<div class=playlistIconContainer>";

$playlists = Playlist::find()->all();
foreach ($playlists as $playlist) {
    echo $this->render('_playlistIcon', ['playlist' => $playlist]);
}
echo '<a href=# id="new-playlist-btn"><div class="playlistIcon"><p>Добавить<br>плэйлист</p></div></a>';

echo "</div>";
Playlist::addMenu();
?>

<script src="js/menu.js"></script>
