<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "relSongsPlaylists".
 *
 * @property int $id
 * @property int $song_id
 * @property int $playlist_id
 */
class RelSongsPlaylists extends \yii\db\ActiveRecord
{
    public static function addRelation($playlistId, $songId){
        $insctance = new self();
        if(RelSongsPlaylists::find()->where([
            'playlist_id'=>$playlistId, 
            'song_id' => $songId
            ])->all()) {
                return false;
        }
        $insctance->playlist_id = $playlistId;
        $insctance->song_id = $songId;
        return $insctance;
    }

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'relSongsPlaylists';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['song_id', 'playlist_id'], 'required'],
            [['song_id', 'playlist_id'], 'integer'],
            [['playlist_id'], 'exist', 'skipOnError' => true, 'targetClass' => Playlist::className(), 'targetAttribute' => ['playlist_id' => 'id']],
            [['song_id'], 'exist', 'skipOnError' => true, 'targetClass' => Song::className(), 'targetAttribute' => ['song_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'song_id' => 'Song ID',
            'playlist_id' => 'Playlist ID',
        ];
    }
}
