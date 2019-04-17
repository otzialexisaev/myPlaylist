<?php
  use yii\helpers\Html;
?>

<?= Html::a("<div class='playlistIcon' id=".$playlist->id."><p>".$playlist->name."</p></div>", ['playlist/view/', 'id' => $playlist->id]) ?>