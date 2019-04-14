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
class Songs extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'Songs';
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
