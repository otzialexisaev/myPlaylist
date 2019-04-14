<?php
/* @var $this yii\web\View */

use app\models\RelSongsPlaylists;
use app\models\Playlists;
use app\models\Songs;

echo "<div class=playlistIconContainer>";

$relations = Playlists::find()->all();
foreach ($relations as $value) {
    echo $this->render('_playlistIcon', ['playlist' => $value]);
}

echo "</div>";
?>