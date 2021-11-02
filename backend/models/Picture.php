<?php

namespace app\models;

use yii\db\ActiveRecord;


class Picture extends ActiveRecord
{
    public static function tableName(): string
    {
        return 'item';
    }

    public function rules(): array
    {
        return [
            [['name', 'item_id', 'user_id'], 'required'],
            [['link'], 'string'],
            [['name', 'item_id', 'user_id', 'created_at', 'updated_at'], 'integer']
        ];
    }

    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'item_id' => 'Item ID',
            'user_id' => 'User ID',
            'link' => 'Picture Link',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}