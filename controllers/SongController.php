<?php

namespace app\controllers;

use app\models\RelSongsPlaylists;

class SongController extends \yii\web\Controller
{
    public function actionAdd($playlistId, $songId)
    {
        if($rel = RelSongsPlaylists::addRelation($playlistId, $songId)){
            $rel->save();
        }
    }

    public function actionSongs()
    {
        return $this->render('songs');
    }

    public function actionPlaylists()
    {
        return $this->render('playlists');
    }

}
