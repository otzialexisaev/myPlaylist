<?php

namespace app\controllers;

use app\models\RelSongsPlaylists;
use app\models\Song;

class RelsongsplaylistsController extends \yii\web\Controller
{
    /**
     * Функция добавляет запись в таблицу отношения песен и плейлистов
     *
     * @param int/array $playlistId
     * @param $songId
     */
    public function actionAdd(int $playlistId, int $songId)
    {
        if ($rel = RelSongsPlaylists::addRelation($playlistId, $songId)) {
            $rel->save();
        }
    }

    /**
     * Функция добавляет запись в таблицу отношения песен и плейлистов
     *
     * @param string $playlistIds JSON encoded array
     * @param int $songId
     */
    public function actionAddarray(string $playlistIds, int $songId)
    {
        $playlistIds = json_decode($playlistIds);
        if ($playlistIds && is_array($playlistIds) && $songId) {
            foreach ($playlistIds as $id) {
                if ($rel = RelSongsPlaylists::addRelation($id, $songId)) {
                    $rel->save();
                }
            }
        }
    }

    public function actionIndex()
    {
        return $this->render('index');
    }

}
