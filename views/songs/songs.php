<?php
/* @var $this yii\web\View */
use app\models\Songs;

$allSongs = Songs::find()->all();
foreach($allSongs as $song){
    echo substr($song->name, 0, -4)."<br>";
}

?>

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