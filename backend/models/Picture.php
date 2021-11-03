<?php

namespace app\models;

use yii\db\ActiveRecord;


class Picture extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'picture';
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['link'], 'required'],
            [['link'], 'string'],
            [['item_id', 'user_id', 'created_at', 'updated_at'], 'integer']
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'link' => 'Picture Link',
            'user_id' => 'User ID',
            'item_id' => 'Item Id',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}