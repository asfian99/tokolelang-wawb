<?php

namespace app\models;

use yii\db\ActiveRecord;


class Item extends ActiveRecord
{
    public static function tableName(): string
    {
        return 'item';
    }

    public function rules(): array
    {
        return [
            [['name', 'open_bid'], 'required'],
            [['name', 'description'], 'string'],
            [['open_bid', 'fundraising', 'closing_time', 'user_id', 'created_at', 'updated_at'], 'integer']
        ];
    }

    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'name' => 'Name',
            'description' => 'Description',
            'open_bid' => 'Open Bid',
            'fundraising' => 'Fundraising',
            'closing_time' => 'Closing Time',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}