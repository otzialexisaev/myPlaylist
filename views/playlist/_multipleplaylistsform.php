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
  "<div style='display: table;width: inherit;'>";
  foreach ($playlistsAttributes as $attribute ) {
    $id = $attribute['id'];
    $name = $attribute['name'];
    $html .=
    "<div style='display: table-row;'>
      <div id='add-playlist-menu-item-$id' class='add-playlist-menu-item noselect'>$name</div>
      <div id='add-playlist-menu-item-select-$id' class='add-playlist-menu-item-select noselect'>
        <div class='add-playlist-menu-item-circle'></div>
      </div>
    </div>";
  }

$html .= "
    </div>
  </div>
  <form id='add-playlist-menu-submit-form' action='/index.php?r=playlist%2Faddmultipleplaylistsformsubmit' method='GET' style='margin-top: 20px;'>
    <input id='add-playlist-menu-submit' type='submit' value='Принять' class='btn btn-success'>
  </form>
</div>";

$data['html'] = $html;
echo json_encode($data);