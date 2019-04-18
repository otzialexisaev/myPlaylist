<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "Songs".
 *
 * @property int $id
 * @property string $name
 * @property string $path
 */
class Song extends \yii\db\ActiveRecord
{

    public function display()
    {
        echo '<div class="songContainer noselect" data-audio="'
        . $this->path
        . $this->name
        . '">'
        . substr($this->name, 0, -4) 
        . '</div>';
    }


    // public function display()
    // {
    //     echo '<div class="songContainer noselect" data-audio="'
    //     . $this->path
    //     . $this->name
    //     . '">'
    //     . substr($this->name, 0, -4) 
    //     . '</div>';
    // }

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'Song';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'path'], 'required'],
            [['name', 'path'], 'string'],
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
            'path' => 'Path',
        ];
    }
}
