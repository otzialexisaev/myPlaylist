<?php

namespace app\controllers;

use app\models\Playlist;

class PlaylistController extends \yii\web\Controller
{

    public function actionIndex()
    {
        return $this->render('playlists');
    }

    public function actionView($id)
    {
        $playlist = Playlist::find()->where(['id'=>$id])->one();
        return $this->render('view', ['playlist' => $playlist]);
    }

}
