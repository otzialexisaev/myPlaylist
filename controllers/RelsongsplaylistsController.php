<?php

namespace app\controllers;

use app\models\RelSongsPlaylists;

class RelsongsplaylistsController extends \yii\web\Controller
{
    public function actionAdd($playlistId, $songId)
    {
        if($rel = RelSongsPlaylists::addRelation($playlistId, $songId)){
            $rel->save();
        }
    }

    public function actionIndex()
    {
        return $this->render('index');
    }

}
