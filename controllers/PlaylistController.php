<?php

namespace app\controllers;

use app\models\Playlist;

class PlaylistController extends \yii\web\Controller
{
  public function actionShowmultipleplaylistsform()
  {
    return $this->get_include_contents('../views/playlist/_multipleplaylistsform.php');
  }

  public function actionShowaddplaylistform() {
    return $this->get_include_contents('../views/playlist/_addplaylistform.php');
  }

  public function actionAddplaylistformsubmit() {
    $this->actionAddplaylist($_GET['name']);
  }

  public function actionAddplaylist($name){
    $playlist = new Playlist();
    $playlist->name = $name;
    $playlist->save();
  }

  function get_include_contents($filename) {
    if (is_file($filename)) {
        ob_start();
        include $filename;
        return ob_get_clean();
    }
    return false;
  }

  public function actionIndex()
  {
    return $this->render('playlists');
  }

  public function actionView($id)
  {
    $playlist = Playlist::find()->where(['id' => $id])->one();
    return $this->render('view', ['playlist' => $playlist]);
  }
}
