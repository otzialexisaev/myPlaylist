<?php

namespace app\controllers;

use app\models\Playlists;

class PlaylistsController extends \yii\web\Controller
{

    public function actionIndex()
    {
        return $this->render('playlists');
    }

    public function actionView($id)
    {
        $playlist = Playlists::find()->where(['id'=>$id])->one();
        return $this->render('view', ['playlist' => $playlist]);
    }

}
