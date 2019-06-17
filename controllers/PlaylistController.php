<?php

namespace app\controllers;

use app\models\Playlist;

class PlaylistController extends \yii\web\Controller
{
    public function actionShowaddplaylistmenu()
    {
        return $this->get_include_contents('../views/playlist/_addPlaylistMenu.php');
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
