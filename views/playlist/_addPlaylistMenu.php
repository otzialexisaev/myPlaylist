<?php

use app\models\Playlist;

$data = array();
$data['test'] = array();

$playlists = Playlist::find()->orderBy(['changed_at'=> SORT_DESC])->all();
$playlistsAttributes = [];
foreach ($playlists as $playlist) {
  array_push($playlistsAttributes, $playlist->getAttributes());
}
$html = '
<div id="background" class="background"></div>
<div id="menu-darkbg" class="menu-darkbg">
  <div id="inner-playlist-form" class="inner-playlist-form">';

$html .=
    '<div style="display: table;width: inherit;">';
  foreach ($playlistsAttributes as $attribute ) {
      $html .= '<div style="display: table-row;">';
      $html .= '<div id="'. $attribute['id'] .'" class="add-playlist-menu-item noselect">';
      $html .= $attribute['name'];
      $html .= '</div>';
      $html .= '</div>';
  }

$html .= '
    </div>
  </div>
  <form id="add-playlist-menu-submit-form" action="/index.php?r=playlist%2Faddplaylistformsubmit" method="GET">
    <input id="add-playlist-menu-submit" type="submit" value="Принять" class="btn btn-success">
  </form>
</div>';

$data['html'] = $html;
echo json_encode($data);