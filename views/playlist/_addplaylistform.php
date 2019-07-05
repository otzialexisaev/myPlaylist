<?php

use app\models\Playlist;

$data = array();
$data['test'] = array();

$playlists = Playlist::find()->orderBy(['changed_at'=> SORT_DESC])->all();
$playlistsAttributes = [];
foreach ($playlists as $playlist) {
  array_push($playlistsAttributes, $playlist->getAttributes());
}
$html = "
<div id='background' class='background'></div>
<div id='menu-darkbg' class='menu-darkbg' style='padding: 20px 20px 20px 20px;'>
  <div id='inner-playlist-form' class='inner-playlist-form' style='background-color: unset'>
  <form id='add-playlist-menu-submit-form' action='/index.php?r=playlist%2Faddplaylistformsubmit' method='GET' style='margin-top: 20px;'>
    <p style='color:white'>Название плейлиста:</p>
    <input id='add-playlist-menu-name' type='text' name='name'>
    <input id='add-playlist-menu-submit' type='submit' value='Принять' class='btn btn-success'>
  </form>
</div>";


$data['html'] = $html;
echo json_encode($data);