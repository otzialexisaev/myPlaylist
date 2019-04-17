<?php

namespace app\models;

use app\models\RelSongsPlaylists;
use app\models\Song;
use Yii;

/**
 * This is the model class for table "Playlists".
 *
 * @property int $id
 * @property string $name
 */
class Playlist extends \yii\db\ActiveRecord
{
    private $relatedSongs = [];
    private function getRelatedSongs()
    {
        $relatedRSPObjects = RelSongsPlaylists::find()->where(['playlist_id' => $this->id])->all();
        foreach ($relatedRSPObjects as $RSPObject) {
            $song = Song::find()->where(['id' => $RSPObject['song_id']])->one();
            array_push($this->relatedSongs, $song);
        }
    }

    public function displayRelatedSongs()
    {
        $this->getRelatedSongs();
        foreach ($this->relatedSongs as $song) {
            $song->display();
        }
    }

    /**
     * {@inheritdoc}
     */

    public static function tableName()
    {
        return 'Playlist';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
        ];
    }
}
