<?php

use app\models\mymodels\PlayerContainer;
use app\models\Playlist;
use app\models\Song;
use app\models\RelSongsPlaylists;

$playerContainer = new PlayerContainer();
$playerContainer->display();

echo "<div class='ostContainer'>";
$allSongs = Song::find()->all();
foreach ($allSongs as $song) {
    $song->display();
}
echo "</div>";
Playlist::addMenu();
?>

<audio id="audio"></audio>
<div id="testdiv"></div>
<script src="js/jquery.js"></script>
<script src="js/newautoplay.js"></script>
<script src="js/menu.js"></script>
<script src="js/addPlaylistMenu.js"></script>

<?php /*Занесение в базу данных
use app\models\Songs;

$fullpath = "files/songs/10 - Owarimonogatari Second Season/All/";
//$fi = new FilesystemIterator($fullpath);
$fi = new FilesystemIterator($fullpath, FilesystemIterator::SKIP_DOTS);

printf("There were %d Files", iterator_count($fi));
echo "<br>";
$filesArr = scandir($fullpath);
//$filesArr = array_slice(scandir($fullpath), 2);
chdir($fullpath);
foreach (glob("*.mp3") as $fileName) {
echo $fileName . "<br>";
$ost = new Songs();
$ost->name = $fileName;
$ost->path = $fullpath;
$ost->save();
echo "saved";
} */
?>