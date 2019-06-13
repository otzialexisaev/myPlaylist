<?php

namespace app\controllers;

class SongController extends \yii\web\Controller
{
    public function actionSongs()
    {
        return $this->render('songs');
    }

    public function actionPlaylists()
    {
        return $this->render('playlists');
    }

}
