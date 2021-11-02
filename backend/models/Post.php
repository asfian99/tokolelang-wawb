<?php

namespace app\models;

use yii\db\ActiveRecord;


class Post extends ActiveRecord
{ 
    public static function tableName(): string
    {
        return 'post';
    }

    public function rules(): array
    {
        return [
            [['title'], 'required'],
            [['title', 'body'], 'string']
        ];
    }

    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'body' => 'Body',
        ];
    }
}