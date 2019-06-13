<?php

use app\models\Playlist;
use yii\helpers\Html;

$playlists = Playlist::find()->orderBy(['changed_at'=> SORT_DESC])->all();
$playlistsAttributes = [];
foreach ($playlists as $playlist ) {
  array_push($playlistsAttributes, $playlist->getAttributes());
}
$html = '
<div id="background" class="background"></div>
<div id="menu-darkbg" class="menu-darkbg">
  <div id="inner-playlist-form" class"inner-playlist-form">';

$html .= '<div style="display: table;width: inherit;">';
  foreach ($playlistsAttributes as $attribute ) {
      $html .= '<div style="display: table-row;">';
      $html .= '<div style="display: table-cell; vertical-align: middle;"  class="add-playlist-menu-item">';
      $html .= $attribute['name'];
      $html .= '</div>';
      $html .= '</div>';
  }
$html .= '</div>';

$html .= '
  </div>
  <form action="/index.php?r=playlist%2Faddplaylistformsubmit" method="GET">
    <input type="submit" value="Принять" class="btn btn-success">
  </form>
</div>';

$playlists = ['first', 'second'];
$data = array();
$data['html'] = $html;
$data['playlists'] = $playlistsAttributes;
echo json_encode( $data);