<?php
/* @var $this yii\web\View */

use app\models\RelSongsPlaylists;
use app\models\Playlist;
use app\models\Songs;

echo "<div class=playlistIconContainer>";

$playlists = Playlist::find()->all();
foreach ($playlists as $playlist) {
    echo $this->render('_playlistIcon', ['playlist' => $playlist]);
}

echo "</div>";
?>