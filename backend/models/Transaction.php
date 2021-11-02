<?php

namespace app\models;

use yii\db\ActiveRecord;


class Transaction extends ActiveRecord
{
    public static function tableName(): string
    {
        return 'transaction';
    }

    public function rules(): array
    {
        return [
            [['user_id', 'item_id', 'bid_value'], 'required'],
            [['user_id', 'item_id', 'bid_value', 'created_at', 'updated_at'], 'integer'],
        ];
    }

    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'item_id' => 'Item ID',
            'bid_value' => 'Bid Value',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}